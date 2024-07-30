const { Router } = require("express");
const LocaisDeColetaController = require("../controllers/LocaisDeColetaController");

const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/', LocaisDeColetaController.criarLocalDeColeta
    /*
    #swagger.tags = ['Locais de Coleta']
    #swagger.description = 'Endpoint para criar um local de coleta'
    #swagger.parameters.parameters['CriarLocalDeColeta'] = {
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
    /**
     * #swagger.tags = ['Locais de Coleta']
     */
)
locaisDeColetaRoutes.get('/:id', LocaisDeColetaController.listarUmLocalDeColeta
    /**
     * #swagger.tags = ['Locais de Coleta']
     */
)
locaisDeColetaRoutes.delete('/:id', LocaisDeColetaController.deletarUmLocalColeta
    /**
     * #swagger.tags = ['Locais de Coleta']
     */
)
locaisDeColetaRoutes.put('/:id', LocaisDeColetaController.atualizarUmLocalDeColeta
    /**
     * #swagger.tags = ['Locais de Coleta']
     */
)
locaisDeColetaRoutes.get('/:id/maps', LocaisDeColetaController.gerarLinkMapsLocalDeColeta
    /**
     * #swagger.tags = ['Locais de Coleta']
     */
)

module.exports = locaisDeColetaRoutes