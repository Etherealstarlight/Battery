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

  async charge(request, response) {
    console.log(request.body)
    const { id } = request.params
    const battery = await Battery.findOne({
      where: { id: id },
    })
    const donorBattery = await Battery.findOne({
      where: { id: battery.donorId },
    })

    await Battery.update(
      {
        percents:
          Math.round(Number(battery.percents) + 0.35 * (100 - Number(battery.percents))) < 100
            ? Math.round(Number(battery.percents) + 0.35 * (100 - Number(battery.percents)))
            : 100,
      },
      {
        where: { id: battery.id },
      }
    )

    await Battery.update(
      {
        percents:
          Math.round(Number(donorBattery.percents) - 0.35 * (100 - Number(battery.percents))) > 0
            ? Math.round(Number(donorBattery.percents) - 0.35 * (100 - Number(battery.percents)))
            : 0,
      },
      {
        where: { id: donorBattery.id },
      }
    )

    return response.json(
      await Battery.findOne({
        where: { id: battery.id },
      })
    )
  }

  async setDonorBattery(request, response) {
    console.log(request.body)
    const { id } = request.params
    await Battery.update(
      { donorId: request.body.id },
      {
        where: { id: id },
      }
    )

    await Battery.update(
      { recipientId: id },
      {
        where: { id: request.body.id },
      }
    )

    const battery = await Battery.findOne({
      where: { id: id },
    })

    return response.json(battery)
  }
}

module.exports = new BatteryController()
