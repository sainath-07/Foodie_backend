const {Schema, model, default : mongoose}=require('mongoose')

const productSchema=new Schema({
    productName: {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    category : {
        type : [
            {
                type: String,
                enum: ['veg', 'Non-veg']
            }
        ]
    },
    Image: {
        type : String
    },
    bestSeller : {
        type: String
    },
    description:{
        type:String
    },
    firm : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Firm'
    }]
});

const Product=model('Product',productSchema)
module.exports=Product