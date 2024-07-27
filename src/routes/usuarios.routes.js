const { Router } = require("express");
const UsuariosController = require("../controllers/UsuariosController");

const usuariosRoutes = new Router()

usuariosRoutes.post('/', UsuariosController.criarUsuario)
usuariosRoutes.post('/login', UsuariosController.fazerLogin)

module.exports = usuariosRoutes