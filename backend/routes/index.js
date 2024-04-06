const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const batteryRouter = require('./batteryRouter')

router.use('/user', userRouter)
router.use('/battery', batteryRouter)

module.exports = router
