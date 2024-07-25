const connection = require("../database/connection");

const Usuario = connection.define('usuarios', {
    nome: {
        type: Sequelize.STRING(125)
      },
      data_de_nascimento: {
        type: Sequelize.DATE
      },
      cpf: {
        type: Sequelize.STRING(14),
      },
      sexo: {
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outro')
      },
      cep: {
        type: Sequelize.STRING(9)
      },
      email: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      logradouro: {
        type: Sequelize.STRING(150)
      },
      uf: {
        type: Sequelize.STRING(2)
      },
      bairro: {
        type: Sequelize.STRING(100)
      },
      localidade: {
        type: Sequelize.STRING(100)
      }
})

module.exports = Usuario