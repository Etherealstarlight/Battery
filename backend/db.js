const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.DB_LINK, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {}, //removed ssl
})
