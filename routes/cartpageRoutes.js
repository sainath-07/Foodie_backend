const { Router } = require('express')
const router = Router()

const { addUserProduct, getAllUserProducts, deleteUserProduct } = require('../controllers/addtocartcontroller')
const userverifytoken = require('../middleware/userVerfiyToken')



router.post('/add-to-cart', userverifytoken, addUserProduct)
    .get('/allproducts', userverifytoken, getAllUserProducts)
    .delete('/deleteproduct/:productId', userverifytoken, deleteUserProduct)

module.exports = router