const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario");

const LocalDeColeta = connection.define('locais_de_coleta', {
    nome_do_local: {
        type: DataTypes.STRING(125)
      },
      descricao: {
        type: DataTypes.TEXT
      },
      cep: {
        type: DataTypes.STRING(9)
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
      },
      latitude: {
        allowNull: false,
        type: DataTypes.STRING(30)
      },  
      longitude: {
        allowNull: false,
        type: DataTypes.STRING(30)
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      }
})

LocalDeColeta.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'local_de_coleta'
})

module.exports = LocalDeColeta