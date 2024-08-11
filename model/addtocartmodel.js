const mongoose = require('mongoose')

const addToCart = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userdetail'
    }
})

const CartPage = mongoose.model('CartPage', addToCart)
module.exports = CartPage