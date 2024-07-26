const connection = require("../database/connection");
const Usuario = require("./Usuario");

const LocalDeColeta = connection.define('locais_de_coleta', {
    nome_do_local: {
        type: Sequelize.STRING(125)
      },
      descricao: {
        type: Sequelize.TEXT
      },
      sexo: {
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outro')
      },
      cep: {
        type: Sequelize.STRING(9)
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
      },
      latitude: {
        allowNull: false,
        type: Sequelize.STRING(9)
      },  
      longitude: {
        allowNull: false,
        type: Sequelize.STRING(9)
      },
      usuario_id: {
        type: Sequelize.INTEGER,
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