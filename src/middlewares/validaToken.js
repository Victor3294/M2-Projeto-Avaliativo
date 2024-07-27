const { verify } = require("jsonwebtoken")

function validaToken (request, response, next) {
    try {
        const token = request.headers.authorization
        console.log(token)
        if(!token){
            return response.status(400).json({mensagem: "Token não anexado"})
        }
        const jwt = token.split(' ')
        const resultado = verify(jwt[1], process.env.SECRET_JWT)
        request.usuarioId = resultado.id
        next()
    } catch (error) {
        if(error.message === "jwt malformed" || error.message === "jwt expired"){
            response.status(401).json({mensagem: "O token não é valido ou está expirado"})
        }
        else {
            response.status(500).json({mensagem: "A requisição falhou"})
        }
        console.log(error.message)
    }   
}

module.exports = validaToken