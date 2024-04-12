const Router = require('express')
const router = new Router()
const batteryController = require('../controllers/batteryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', batteryController.create)
router.patch('/', checkRole('ADMIN'), batteryController.update)
router.post('/:id/charge', batteryController.charge)
router.put('/:id/setDonor', checkRole('ADMIN'), batteryController.setDonorBattery)
router.get('/')
router.get('/:id', batteryController.getUserBattery)

module.exports = router
