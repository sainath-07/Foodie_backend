const express = require('express')
const mongoose = require('mongoose')
const vendorrouters = require('./routes/vendorRoutes')
const firmrouters = require('./routes/firmRoutes')
const productrouters = require('./routes/productsRouter')
const userrouters=require('./routes/userRoutes')
const cartpagerouters=require('./routes/cartpageRoutes')
const paymentgateway=require('./routes/paymentRouters')
require('dotenv').config()
// To convert the inputfields data into JSON format we can use the bodyparser
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())

const port = process.env.port || 8000;

mongoose.connect(process.env.mongodburl)
    .then(x => console.log('database connected'))
    .catch(x => console.log(x))

// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/vendor', vendorrouters);
app.use('/firm', firmrouters);
app.use('/product', productrouters);
app.use('/users', userrouters);
app.use('/cart', cartpagerouters);
app.use('/',paymentgateway)
app.use('/uploads',express.static('uploads'))

app.get('/',(req,res)=>{
    res.send('<h1>Welcom to Foodie Application</h1>')
})

app.listen(port, () => {
    console.log(`server is running at port : ${port}`)
})


