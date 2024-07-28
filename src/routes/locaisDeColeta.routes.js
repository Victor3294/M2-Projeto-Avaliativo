const { Router } = require("express");
const LocaisDeColetaController = require("../controllers/LocaisDeColetaController");

const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/', LocaisDeColetaController.criarLocalDeColeta)
locaisDeColetaRoutes.get('/', LocaisDeColetaController.listarLocaisDeColeta)
locaisDeColetaRoutes.get('/:id', LocaisDeColetaController.listarUmLocalDeColeta)
locaisDeColetaRoutes.delete('/:id', LocaisDeColetaController.deletarUmLocalColeta)
locaisDeColetaRoutes.put('/:id', LocaisDeColetaController.atualizarUmLocalDeColeta)

module.exports = locaisDeColetaRoutes