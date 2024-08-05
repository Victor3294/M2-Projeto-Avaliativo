const swaggerAutogen = require('swagger-autogen')();
const {config} = require('dotenv')
config()
const doc = {
    info: {
        title: "API Recicla365",
        description: "Documentação da API Recicla365 usando express e sequelize",
        version: "1.0.0"
    },
    host: `localhost:${process.env.PORT_API}`,
    security: [{"apiKeyAuth": []}],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Insira o token JWT"
        }
    }
}

const outputFile = './src/routes/doc.swagger.json'
const routes = ['./src/routes/routes.js']

swaggerAutogen(outputFile, routes, doc)