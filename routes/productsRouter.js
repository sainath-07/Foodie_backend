const { Router } = require('express')
const path=require('path')
const { addProduct, getProductByFirm, deleteProductById } = require('../controllers/productcontroller')

const router = Router()

router.post('/add-product/:firmid', addProduct)
    .get('/:firmId', getProductByFirm)
    .get('/uploads/:imageName', (req, res) => {
        const imageName = req.params.imageName;
        res.headersSent('Content-Type', 'image/jpeg');
        res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
    });
router.delete('/:productId',deleteProductById);
module.exports = router