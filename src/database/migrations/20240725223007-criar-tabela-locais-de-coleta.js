'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('locais_de_coleta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_do_local: {
        allowNull: false,
        type: Sequelize.STRING(125)
      },
      descricao: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      sexo: {
        allowNull: false,
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outro')
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING(9)
      },
      logradouro: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      localidade: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('locais_de_coleta')
  }
};
