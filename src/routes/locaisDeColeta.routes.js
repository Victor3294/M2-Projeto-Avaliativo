const { Router } = require("express");
const LocaisDeColetaController = require("../controllers/LocaisDeColetaController");

const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/', LocaisDeColetaController.criarLocalDeColeta)
locaisDeColetaRoutes.get('/', LocaisDeColetaController.listarLocaisDeColeta)

module.exports = locaisDeColetaRoutes