const LocalDeColeta = require("../models/LocalDeColeta")
const { getEnderecoCep } = require("../services/endereco.service")
const { getMapaLocal } = require("../services/map.service")

const regexCep = new RegExp(/^\d{5}-\d{3}$/)
class LocaisDeColetaController {
    async criarLocalDeColeta(request, response) {
        try {
            const dados = request.body
            if (!dados.nome_do_local || !dados.descricao || !dados.cep) {
                return response.status(400).json({ mensagem: "O nome, a descrição e o cep são dados obrigatórios" })
            }
            if (regexCep.test(dados.cep) === false) {
                return response.status(400).json({ mensagem: "O formato do cep enviado é invalido! Use o formato #####-###" })
            }
            const endereco = await getEnderecoCep(dados.cep)
            if (endereco.erro) {
                return response.status(400).json({ mensagem: endereco.erro })
            }
            const coordenadas = await getMapaLocal(dados.cep)
            if (coordenadas.erro) {
                return response.status(400).json({ mensagem: coordenadas.erro })
            }
            const dadosLocalDeColeta = {
                ...dados,
                ...endereco,
                ...coordenadas,
            }
            await LocalDeColeta.create({
                ...dadosLocalDeColeta,
                usuario_id: request.usuarioId
            })
            response.status(201).json(dadosLocalDeColeta)
        } catch (error) {
            console.log(error)
            response.status(500).json({ mensagem: "Não foi possivel cadastrar o local de coleta" })
        }
    }

    async listarLocaisDeColeta(request, response) {
        try {
            const locaisDeColeta = await LocalDeColeta.findAll({
                where: {
                    usuario_id: request.usuarioId
                }
            })
            if (locaisDeColeta.length === 0) {
                return response.status(200).json({ mensagem: "O usuario autenticado não possui nenhum local de coleta cadastrado ainda !" })
            }

            response.status(200).json(locaisDeColeta)
        } catch (error) {
            response.status(500).json({ mensagem: "Não foi possivel realizar a busca" })
        }
    }

    async listarUmLocalDeColeta(request, response) {
        try {
            const id = request.params.id
            const localDeColeta = await LocalDeColeta.findByPk(id)
            if (!localDeColeta) {
                return response.status(404).json({ mensagem: "Não foi encontrado um local de coleta com esse id" })
            }
            if (localDeColeta.usuario_id != request.usuarioId) {
                return response.status(403).json({ mensagem: "Não foi usuario autenticado que cadastrou esse item, então ele não tem permissão para ver suas informações" })
            }
            response.status(200).json(localDeColeta)
        } catch (error) {
            response.status(500).json({ mensagem: "Não foi possivel realizar a busca" })
        }
    }

    async deletarUmLocalColeta(request, response) {
        try {
            const id = request.params.id
            const localDeColeta = await LocalDeColeta.findByPk(id)
            if (!localDeColeta) {
                return response.status(404).json({ mensagem: "Não foi encontrado um local de coleta com esse id" })
            }
            if (localDeColeta.usuario_id != request.usuarioId) {
                return response.status(403).json({ mensagem: "Não foi usuario autenticado que cadastrou esse item, então ele não tem permissão para deletar esse local de coleta" })
            }
            await localDeColeta.destroy()
            response.status(204).json()
        } catch (error) {
            response.status(500).json({ mensagem: "Não foi possivel deletar o local de coleta" })
        }
    }

    async atualizarUmLocalDeColeta(request, response) {
        try {
            const id = request.params.id
            const dados = request.body
            const localDeColeta = await LocalDeColeta.findByPk(id)
            if (!localDeColeta) {
                return response.status(404).json({ mensagem: "Não foi encontrado um local de coleta com esse id" })
            }
            if (localDeColeta.usuario_id != request.usuarioId) {
                return response.status(403).json({ mensagem: "Não foi usuario autenticado que cadastrou esse item, então ele não tem permissão para atualizar esse local de coleta" })
            }
            if (!dados.nome_do_local && !dados.descricao && !dados.cep) {
                return response.status(400).json({ mensagem: "É preciso enviar pelo menos uma informação entre nome, descrição e cep para atualizar o local de coleta" })
            }
            if (dados.cep) {
                if (regexCep.test(dados.cep) === false) {
                    return response.status(400).json({ mensagem: "O formato do cep enviado é invalido! Use o formato #####-###" })
                }
                const endereco = await getEnderecoCep(dados.cep)
                if (endereco.erro) {
                    return response.status(400).json({ mensagem: endereco.erro })
                }
                const coordenadas = await getMapaLocal(dados.cep)
                if (coordenadas.erro) {
                    return response.status(400).json({ mensagem: coordenadas.erro })
                }
                localDeColeta.nome_do_local = dados.nome_do_local
                localDeColeta.descricao = dados.descricao
                localDeColeta.cep = dados.cep
                localDeColeta.logradouro = endereco.logradouro
                localDeColeta.uf = endereco.uf
                localDeColeta.bairro = endereco.bairro
                localDeColeta.localidade = endereco.localidade
                localDeColeta.latitude = coordenadas.latitude
                localDeColeta.longitude = coordenadas.longitude
                await localDeColeta.save()
                return response.status(200).json(localDeColeta)
            }
            localDeColeta.nome_do_local = dados.nome_do_local
            localDeColeta.descricao = dados.descricao
            await localDeColeta.save()
            response.status(200).json(localDeColeta)

        } catch (error) {
            console.log(error)
            response.status(500).json({ mensagem: "Não foi possivel atualizar o local de coleta" })
        }
    }
}

module.exports = new LocaisDeColetaController()