const fs = require('fs')

module.exports = {
  development: {
    username: 'default',
    password: 'TB9bROmMfcoOOq1C2pMVskvNtSikpURl',
    database: 'tactile_battery',
    host: 'dpg-co8sct7109ks73ek55e0-a.oregon-postgres.render.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {},
    },
  },
  production: {
    username: 'default',
    password: 'TB9bROmMfcoOOq1C2pMVskvNtSikpURl',
    database: 'tactile_battery',
    host: 'dpg-co8sct7109ks73ek55e0-a.oregon-postgres.render.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {},
    },
  },
}
