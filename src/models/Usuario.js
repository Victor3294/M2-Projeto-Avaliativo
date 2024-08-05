const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING(125)
      },
      data_de_nascimento: {
        type: DataTypes.DATE
      },
      cpf: {
        type: DataTypes.STRING(14),
      },
      sexo: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro')
      },
      cep: {
        type: DataTypes.STRING(9)
      },
      email: {
        type: DataTypes.STRING
      },
      password_hash: {
        type: DataTypes.STRING
      },
      logradouro: {
        type: DataTypes.STRING(150)
      },
      uf: {
        type: DataTypes.STRING(2)
      },
      bairro: {
        type: DataTypes.STRING(100)
      },
      localidade: {
        type: DataTypes.STRING(100)
      }
})

Usuario.beforeSave((user) => {
  user.password_hash = hashSync(user.password_hash)
  return user
})

module.exports = Usuario