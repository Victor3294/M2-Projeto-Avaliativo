const { Router } = require("express");
const UsuariosController = require("../controllers/UsuariosController");

const usuariosRoutes = new Router()

usuariosRoutes.post('/', UsuariosController.criarUsuario
        /*
     #swagger.tags = ['Usuarios']
     #swagger.description = 'Endpoint para criar um usuario'
     #swagger.parameters['CriarUsuario'] = {
        in:'body',
        description: 'Dados do Usuario',
        required: 'true',
        schema: {
            $nome: "Usuario Teste",
            $data_de_nascimento: "2000-02-20",
            $cpf: "111-111-111.11",
            $sexo: "Masculino / Feminino / Outro",
            $cep: "44444-444",
            $email: "email@email.com",
            $password_hash: "senha"
        }
     }
     */
)
usuariosRoutes.post('/login', UsuariosController.fazerLogin
    /*
     #swagger.tags = ['Usuarios']
     #swagger.description = 'Endpoint para logar um usuario'
     #swagger.parameters['logarUsuario'] = {
        in:'body',
        description: 'Dados do Usuario',
        required: 'true',
        schema: {
            $email: "email@email.com",
            $password_hash: "senha"
        }
     }
 */
)


module.exports = usuariosRoutes