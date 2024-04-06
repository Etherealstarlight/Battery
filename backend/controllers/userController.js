const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Battery } = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async registration(request, response, next) {
    const { email, password, role } = request.body
    if (!email || !password) return next(ApiError.bardRequest('Incorrect user data'))

    const candidate = await User.findOne({ where: { email } })
    if (candidate) return next(ApiError.badRequest('User already exists'))

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })

    await Battery.create({ userId: user.id })

    const token = generateJwt(user.id, user.email, user.role)
    return response.json({ token })
  }

  async login(request, response, next) {
    const { email, password } = request.body
    const user = await User.findOne({ where: { email } })

    if (!user) return next(ApiError.internal('User not found'))

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return next(ApiError.internal('Incorrect password'))

    const token = generateJwt(user.id, user.email, user.role)

    return response.json({ token })
  }

  async logout(request, response, next) {
    const { email, password } = request.body
    const user = await User.findOne({ where: { email } })

    if (!user) return next(ApiError.internal('User not found'))

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return next(ApiError.internal('Incorrect password'))

    const token = generateJwt(user.id, user.email, user.role)

    return response.json({ token })
  }

  async getUserData(request, response, next) {
    response.json({ id: request.user.id, email: request.user.email, role: request.user.role })
  }
}

module.exports = new UserController()
