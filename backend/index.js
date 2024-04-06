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
  const batteries = await models.Battery.findAll()

  batteries.forEach(async (battery) => {
    if (battery.percents > 1) {
      await models.Battery.update(
        { percents: Number(battery.percents) >= 11 ? Number(battery.percents) - 10 : 1 },
        {
          where: { id: battery.id },
        }
      )
    }
  })
}, 100000)

app.get('/', (request, response) => {
  response.status(200).json({ message: 'SUCCESS' })
})
