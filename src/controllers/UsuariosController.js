const { compareSync } = require("bcryptjs")
const Usuario = require("../models/Usuario")
const { getEnderecoCep } = require("../services/endereco.service")
const { sign } = require("jsonwebtoken")

const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const regexCep = new RegExp(/^\d{5}-\d{3}$/)
class UsuariosController {
    async criarUsuario (request, response) {
        try {
            const dados = request.body
            if(!dados.nome || !dados.data_de_nascimento || !dados.cpf || !dados.sexo || !dados.cep || !dados.email || !dados.password_hash) {
                return response.status(400).json({mensagem: "O nome, a data de nascimento, o cpf, o sexo, o cep, o email e a senha são dados obrigatorios"})
            }
            if(dados.data_de_nascimento.length != 10){
                return response.status(400).json({mensagem: "O formato da data enviado é invalido! Use o formato YYYY-MM-DD"})
            }
            const dataDeNascimento = dados.data_de_nascimento.replace(/\s/g, '').split('-')
            if(dataDeNascimento[0].length != 4 || dataDeNascimento[1].length != 2 || dataDeNascimento[2].length != 2){
                return response.status(400).json({mensagem: "O formato da data enviado é invalido! Use o formato YYYY-MM-DD"})
            }
            if(dados.sexo !== "Masculino" && dados.sexo !== "Feminino" && dados.sexo !== "Outro"){
                return response.status(400).json({mensagem: "Informe um sexo valido !"})
            }
            if(regexEmail.test(dados.email) === false) {
                return response.status(400).json({mensagem: "O formato do email enviado é invalido! Use um formato valido!"})
            }
            if(regexCep.test(dados.cep) === false){
                return response.status(400).json({mensagem: "O formato do cep enviado é invalido! Use o formato #####-###"})
            }
            const cpfExistente = await Usuario.findOne({
                where: {
                    cpf : dados.cpf
                }
            })
            const emailExistente = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            })
            if(cpfExistente || emailExistente){
                if(cpfExistente.length !== 0 || emailExistente.length !== 0){
                    return response.status(409).json({mensagem: "CPF ou email invalido"})
                }
            }

            const endereco = await getEnderecoCep(dados.cep)

            if(endereco.erro){
                return response.status(400).json({mensagem: endereco.erro})
            }

            const dadosComEndereco = {
                ...dados,
                ...endereco
            }

            const usuarioCriado = await Usuario.create(dadosComEndereco)
            response.status(201).json({
                nome: usuarioCriado.nome,
                sexo: usuarioCriado.sexo,
                createdAt: usuarioCriado.createdAt,
                updatedAt: usuarioCriado.updatedAt
            })
            
        } catch (error) {
            console.log(error)
            response.status(500).json({mensagem: "Não foi possivel cadastrar o usuário"})
        }
    }

    async fazerLogin(request, response) {
        try {
            const dados = request.body
            if(!dados.email || !dados.password_hash) {
                return response.status(400).json({mensagem: "A senha e o email ou o cpf são obrigatorios para fazer o login!"})
            }
            const usuario = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            })
            if(!usuario){
                return response.status(401).json({mensagem: "Email ou senha incorretos"})
            }
            const senhaCorreta = compareSync(dados.password_hash, usuario.password_hash)
            if(!senhaCorreta){
                return response.status(401).json({mensagem: "Email ou senha incorretos"})
            }
            const token = sign({
                id: usuario.id
            }, process.env.SECRET_JWT, {
                expiresIn: "1d"
            })
            response.status(200).json({
                token: token,
                nome: usuario.nome
            })
        } catch (error) {
            response.status(500).json({mensagem: "Não foi possivel realizar o login"})
        }
    }
}

module.exports = new UsuariosController