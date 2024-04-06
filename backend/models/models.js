// const sequelize = require('../db')
// const { DataTypes } = require('sequelize')

// const User = sequelize.define('user', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   email: { type: DataTypes.STRING, unique: true },
//   password: { type: DataTypes.STRING },
//   role: { type: DataTypes.STRING, defaultValue: 'USER' },
// })

// const Battery = sequelize.define('battery', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   percents: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
// })

// User.hasOne(Battery)
// Battery.belongsTo(User)

// module.exports = {
//   User,
//   Battery,
// }
