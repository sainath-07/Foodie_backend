const CartPage = require('../model/addtocartmodel')
const Userdetail = require('../model/usermodels')

const addUserProduct = async (req, res) => {
    try {
        const { productName, price, image, count, totalPrice } = req.body


        const user = await Userdetail.findById(req.userId)

        if (!user) {
            res.status(404).json({ message: "userToken not found" })
        }

        const cartPageProducts = new CartPage({
            productName, price, image, count, totalPrice, user: user._id
        })

        const savedcartPageProducts = await cartPageProducts.save()

        res.status(200).json({
            message: "Product added successfully",
            savedcartPageProducts,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal server error" })
    }
}

const getAllUserProducts = async (req, res) => {
    try {
        const products = await CartPage.find(
            { user: req.userId }
        )


        if (!products) {
            return res.status(404).json({
                message: 'No Products found check token'
            })
        }


        res.status(200).json({
            message: 'All Products',
            no_of_products: products.length,
            products
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ errorMessage: 'Internal server error' })
    }
}


const deleteUserProduct = async (req, res) => {
    try {
        const { productId } = req.params

        if (!productId) {
            return res.status(404).json({
                message: 'Product Id not found'
            })
        }

        const deleteProduct = await CartPage.findByIdAndDelete({

            user: req.userId,
            _id: productId

        })

        if(!deleteProduct){
            return res.status(404).json({
                message : 'product doesnot exist in database'
            })
        }

        res.status(200).json({
            message: 'Todo deleted successfully',
            deleteProduct,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "internalServer error" })
    }
}




module.exports = {
    addUserProduct, getAllUserProducts, deleteUserProduct
}