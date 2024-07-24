const { Router } = require("express");

const routes = new Router()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json')

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = routes