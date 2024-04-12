'use strict'

const { DataTypes, DATE } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('users', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      login: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: 'USER' },
      createdAt: {
        allowNull: false,
        type: DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
      },
    })
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users')
  },
}
