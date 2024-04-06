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
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server Connection Successful on ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

console.log(router)

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

// const CONNECTION_STRING = "";

// const DATABASENAME = "tactilebatteryappdb";
// var database;

app.get('/', (request, response) => {
  response.status(200).json({ message: 'SUCCESS' })
})

// app.post(
//   "/api/tactilebatteryapp/AddBattery",
//   multer().none(),
//   (request, response) => {
//     database
//       .collection("tactilebatterycollection")
//       .count({}, function (error, numOfDocs) {
//         database.collection("tactilebatterycollection").insertOne({
//           id: (numOfDocs + 1).toString(),
//           percents: request.body.percents,
//         });
//         response.json("Added Successfully");
//       });
//   }
// );

// app.delete("/api/tactilebatteryapp/DeleteBattery", (request, response) => {
//   database.collection("tactilebatterycollection").deleteOne({
//     id: request.body.id,
//   });
//   response.json("Delete Successfully");
// });
