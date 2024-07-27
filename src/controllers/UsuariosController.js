const Usuario = require("../models/Usuario")

const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
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
            const usuario = {
                ...dados,
            }
            
            
            response.status(200).json({mensagem: "Deu certo!"})
        } catch (error) {
            console.log(error)
            response.status(500).json({mensagem: "Não foi possivel cadastrar o usuário"})
        }
    }
}

module.exports = new UsuariosController