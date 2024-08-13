const { Router } = require('express')
const { paymentfun, paymentVerify } = require('../controllers/paymentcontroller')
const router = Router()

router.get('/payment',paymentfun)
    .post('/verify',paymentVerify)


module.exports=router