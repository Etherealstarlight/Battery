'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'batteries',
          'recipientId',
          {
            type: DataTypes.STRING,
          },
          { transaction: t }
        ),
      ])
    })
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.removeColumn('batteries', 'recipientId', { transaction: t })])
    })
  },
}
