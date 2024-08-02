const multer = require('multer')
const Firm = require('../model/firmmodel')
const Product = require('../model/productsmodel')
const path=require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body

        const image = req.file ? req.file.filename : undefined;

        const firmid = req.params.firmid
        const firm = await Firm.findById(firmid)

        if (!firm) {
            return res.status(400).json({ error: "No firm found" })
        }

        const product = new Product({
            productName, price, category, bestSeller, description, image, firm: firm._id
        })


        const savedProduct = await product.save();
        res.status(200).json({
            savedProduct
        })

        firm.products.push(savedProduct)
        await firm.save()

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal server error" })
    }
}


const getProductByFirm = async (req, res) => {

    try {
        const firmId = req.params.firmId
        console.log(firmId,'firmId')
        const firm = await Firm.findById(firmId).populate('products');

        if (!firm) {
            return res.status(404).json({ errorMessage: "firm not found" })
        }

        const resturantName = firm.firmName
        // const products = await Product.find({firmId})
        const products = firm.products;

        res.status(200).json({
            resturantName,
            No_of_products: products.length,
            products
        })

    } catch (error) {
        res.status(500).json({
            errorMessage: 'internal server Error'
        })
    }


}

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deleteProductById = await Product.findByIdAndDelete(productId)

        if (!deleteProductById) {
            return res.status(400).json({ error: "Product not found" })
                }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = {
    addProduct: [upload.single('image'), addProduct],
    getProductByFirm,
    deleteProductById
};