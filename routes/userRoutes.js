const { Router } = require('express')
const router = Router()

const { userRegister, userLogin } = require('../controllers/usercontroller')

router.post('/register', userRegister)
    .post('/login', userLogin)

module.exports = router