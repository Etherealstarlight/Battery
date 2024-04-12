const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Battery } = require('../models/models')

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async registration(request, response, next) {
    const { login, password, role } = request.body
    if (!login || !password) return next(ApiError.bardRequest('Incorrect user data'))

    const candidate = await User.findOne({ where: { login } })
    if (candidate) return next(ApiError.badRequest('User already exists'))

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ login, role, password: hashPassword })

    await Battery.create({ userId: user.id, percents: 0 })

    const token = generateJwt(user.id, user.login, user.role)
    return response.json({ token })
  }

  async login(request, response, next) {
    const { login, password } = request.body
    const user = await User.findOne({ where: { login } })

    if (!user) return next(ApiError.internal('User not found'))

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return next(ApiError.internal('Incorrect password'))

    const token = generateJwt(user.id, user.login, user.role)

    return response.json({ token })
  }

  async logout(request, response, next) {
    const { login, password } = request.body
    const user = await User.findOne({ where: { login } })

    if (!user) return next(ApiError.internal('User not found'))

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return next(ApiError.internal('Incorrect password'))

    const token = generateJwt(user.id, user.login, user.role)

    return response.json({ token })
  }

  async getUserData(request, response, next) {
    const userBatteries = await Battery.findAll({ where: { userId: request.user.id } })

    const batteryIds = userBatteries?.map((battery) => battery.dataValues?.id)

    response.json({
      id: request.user.id,
      login: request.user.login,
      role: request.user.role,
      batteryIds,
    })
  }
}

module.exports = new UserController()
