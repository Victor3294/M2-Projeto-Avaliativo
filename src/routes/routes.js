const { Router } = require("express");

const routes = new Router()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json');
const usuariosRoutes = require("./usuarios.routes");
const validaToken = require("../middlewares/validaToken");
const locaisDeColetaRoutes = require("./locaisDeColeta.routes");

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/usuarios', usuariosRoutes)
routes.use('/local', validaToken ,  locaisDeColetaRoutes)

module.exports = routes