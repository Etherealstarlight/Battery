const Router = require('express')
const router = new Router()
const batteryController = require('../controllers/batteryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', batteryController.create)
router.patch('/', checkRole('ADMIN'), batteryController.update)
router.get('/')
router.get('/:id', batteryController.getUserBattery)

module.exports = router
