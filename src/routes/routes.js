const { Router } = require("express");

const routes = new Router()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json');
const usuariosRoutes = require("./usuarios.routes");

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/usuarios', usuariosRoutes)

module.exports = routes