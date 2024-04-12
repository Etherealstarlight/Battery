'use strict'

const { DataTypes, DATE } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('batteries', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      percents: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      donorId: { type: DataTypes.INTEGER, allowNull: true },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
      },
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
    return queryInterface.dropTable('batteries')
  },
}
