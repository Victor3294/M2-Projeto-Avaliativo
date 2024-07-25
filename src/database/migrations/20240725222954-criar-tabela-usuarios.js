'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(125)
      },
      data_de_nascimento: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(14),
        unique: true
      },
      sexo: {
        allowNull: false,
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outro')
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING(9)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('usuarios')
  }
};
