const { Router } = require('express')
const router = Router()
const { vendorRegister, vendorLogin, getallvendors,getsinglevendors } = require('../controllers/vendorController')


router.post('/register', vendorRegister)
    .post('/login', vendorLogin)
    .get('/all-vendors', getallvendors)
    .get('/singleVendorbyid/:_id', getsinglevendors)

module.exports = router