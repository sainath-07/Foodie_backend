const { Router } = require('express')
const router = Router()
const path = require('path')


const { addUserProduct, getAllUserProducts, deleteUserProduct, updateUserProductQuantity } = require('../controllers/addtocartcontroller')
const userverifytoken = require('../middleware/userVerfiyToken')



router.post('/add-to-cart', userverifytoken, addUserProduct)
    .get('/allproducts', userverifytoken, getAllUserProducts)
    .delete('/deleteproduct/:productId', userverifytoken, deleteUserProduct)
    .patch('/updateQuantity/:productId', userverifytoken, updateUserProductQuantity)

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
});
module.exports = router