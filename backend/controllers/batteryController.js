const { Battery } = require('../models/models')
const ApiError = require('../error/ApiError')

class BatteryController {
  async create(request, response) {
    try {
      const { userId } = request.body
      const battery = await Battery.create({ userId })
      return response.json(battery)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getUserBattery(request, response) {
    const { id } = request.params
    const battery = await Battery.findOne({
      where: { id },
    })

    return response.json(battery)
  }

  async update(request, response) {
    console.log(request.body)
    await Battery.update(
      { percents: request.body.percents < 100 ? request.body.percents : 100 },
      {
        where: { id: request.body.id },
      }
    )

    const battery = await Battery.findOne({
      where: { id: request.body.id },
    })

    return response.json(battery)
  }
}

module.exports = new BatteryController()
