require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Connection Successful on ${PORT}`)
    })
    await sequelize.authenticate()
    await sequelize.sync()
  } catch (e) {
    console.log(e)
  }
}

start()

console.log('STARTED')

setInterval(async () => {
  console.log('Percents decreased')

  const batteries = await models.Battery.findAll()

  const donorBatteries = batteries.filter((battery) => battery.recipientId)
  const recepientBatteries = batteries.filter((battery) => battery.donorId)

  recepientBatteries.forEach(async (battery) => {
    await models.Battery.update(
      { percents: Math.floor(0.95 * Number(battery.percents)) > 1 ? Math.floor(0.95 * Number(battery.percents)) : 1 },
      {
        where: { id: battery.id },
      }
    )
  })

  donorBatteries.forEach(async (battery) => {
    await models.Battery.update(
      {
        percents:
          Math.ceil(battery.percents + 0.15 * (100 - Number(battery.percents))) < 100
            ? Math.ceil(battery.percents + 0.15 * (100 - Number(battery.percents)))
            : 100,
      },
      {
        where: { id: battery.id },
      }
    )
  })
}, 1000 * 60 * 60)

app.get('/', (request, response) => {
  response.status(200).json({ message: 'SUCCESS' })
})
