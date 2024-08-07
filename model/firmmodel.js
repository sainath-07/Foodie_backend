const { Schema, model, default: mongoose } = require('mongoose')

const firmScheme = new Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true,

    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'Non-veg']
            }
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ['South-Indian', 'North-Indian', 'chinese', 'bakery']
            }
        ]
    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],

})

const Firm = model('Firm', firmScheme)
module.exports = Firm