const { Router } = require("express");
const LocaisDeColetaController = require("../controllers/LocaisDeColetaController");

const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/', LocaisDeColetaController.criarLocalDeColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.description = 'Endpoint para criar um local de coleta; onde apenas usuários logados tem o acesso'
    #swagger.parameters.['CriarLocalDeColeta'] = {
        in: 'body',
        description: 'Dados do local de coleta',
        required: 'true',
        schema: {
            $nome_do_local: "Local de coleta X",
            $descricao: "Descrição de um local de coleta especifico",
            $cep: "44444-444"
        }
    }
    
    */
)
locaisDeColetaRoutes.get('/', LocaisDeColetaController.listarLocaisDeColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.description = 'Endpoint para listar todos os locais de coleta; onde apenas os usuarios logados tem o acesso'
    */
)
locaisDeColetaRoutes.get('/:id', LocaisDeColetaController.listarUmLocalDeColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.description = 'Endpoint para listar um local de coleta especifico através de seu id; onde apenas o usuario logado tem acesso, e ele só pode ver informações dos locais que foram cadastrados por si próprio'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        type: 'integer'
    }
    */
)
locaisDeColetaRoutes.delete('/:id', LocaisDeColetaController.deletarUmLocalColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.description = 'Endpoint para deletar um local de coleta especifico através de seu id; onde apenas o usuario logado tem acesso, e ele só pode deletar os locais que foram cadastrados por si próprio'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        type: 'integer'
    }
    */
)
locaisDeColetaRoutes.put('/:id', LocaisDeColetaController.atualizarUmLocalDeColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.description = 'Endpoint para atualizar um local de coleta especifico através de seu id; onde apenas o usuario logado tem acesso, e ele só pode atualizar os locais que foram cadastrados por si próprio'
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        type: 'integer'
    }
    #swagger.parameters['AtualizarUmLocalDeColeta'] = {
        in: 'body',
        description: 'Novos dados do local de coleta a ser atualizado',
        required: 'true',
        schema: {
            $nome_do_local: "Local de coleta Y",
            $descricao: "Descrição de um local de coleta especifico",
            $cep: "44444-445"
        }
    }
    */
)
locaisDeColetaRoutes.get('/:id/maps', LocaisDeColetaController.gerarLinkMapsLocalDeColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.parameters['id'] = {
        in: 'path',
        name: 'id',
        type: 'integer'
    }
    #swagger.description = 'Endpoint para gerar o link do google maps do local que é referenciado pelo id que a rota recebe; onde apenas o usuario logado tem acesso, e ele só pode gerar o link dos locais que foram cadastrados por si próprio'
    */
)

module.exports = locaisDeColetaRoutes