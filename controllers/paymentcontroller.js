const crypto = require('crypto')
const { Cashfree } = require('cashfree-pg')
require('dotenv').config()


Cashfree.XClientId = process.env.clinet_id;
Cashfree.XClientSecret = process.env.clinet_secret;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


const generateOrderId = () => {
    const uniqueId = crypto.randomBytes(16).toString('hex')
    const hash = crypto.createHash('sha256')
    hash.update(uniqueId);
    const orderId = hash.digest('hex')
    return orderId.substr(0, 12);
}

const paymentfun = async (req, res) => {

    const { order_amount, customer_details } = req.body

    try {
        let request = {
            "order_amount": order_amount,
            "order_currency": "INR",
            "order_id": await generateOrderId(),
            "customer_details": customer_details
        }

        Cashfree.PGCreateOrder('2023-08-01', request).then(response => {
            console.log(response.data, "paymentfun")
            res.json(response.data)
        })
    } catch (error) {
        console.log(error,"paymentfunction");
        res.json(error)
    }
}

const paymentVerify = async (req, res) => {
    try {
        let { orderId } = req.body;
        console.log(orderId, 'orderid')
        Cashfree.PGOrderFetchPayments('2023-08-01', orderId).then((response) => {
            res.json(response.data)
        }).catch((error) => {
            console.log(error.response.data.message, "paymentVerify")
        })
    } catch (error) {
        console.log(error,'paymentverify')
        res.json(error)
    }
}

module.exports = {
    paymentfun,
    paymentVerify
};