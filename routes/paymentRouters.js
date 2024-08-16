const { Router } = require('express')
const { paymentfun, paymentVerify } = require('../controllers/paymentcontroller')
const router = Router()

router.post('/payment', paymentfun)
    .post('/verify', paymentVerify)


module.exports = router