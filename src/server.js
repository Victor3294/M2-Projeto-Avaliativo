const express = require("express")
const cors = require("cors")
const routes = require('./routes/routes')
const connection = require('./database/connection')

const PORT_API = process.env.PORT_API

class Server {
    constructor ( server = express()) {
        this.middlewares(server)
        this.database()
        server.use(routes)
        this.initializeServer(server)
    }

    async middlewares(app) {
        console.log("Executando os middlewares ...")
        app.use(cors())
        app.use(express.json())
        console.log("Middlewares inicializados !")
    }

    async database () {
        try {
            await connection.authenticate()
            console.log("Conexão com o banco de dados realizada com sucesso")
        } catch (error) {
            console.log(error)
        }
    }

    async initializeServer(app) {
        app.listen(PORT_API, () => {
            console.log(`Servidor conectado na porta ${PORT_API}`)
        })
    }
}

module.exports = {Server}

