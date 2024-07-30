const Vendor = require('../model/vendormodel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretkey = process.env.secretkey

const verifyToken = async (req, res, next) => {
    //checking the JWT token with req.headers
    const token = req.headers.token
    console.log(token, 'token')

    if (!token) {
        return res.status(400).json({ error: "Token is required" })
    }

    try {
        const decoded = jwt.verify(token, secretkey)
        console.log(decoded, 'decoded')
        const vendor = await Vendor.findById(decoded.vendorId)
        console.log(vendor, 'vendor')

        if (!vendor) {
            return res.status(404).json({ error: 'vendor not found' })
        }
        
        req.vendorId = vendor._id;
        next()

    }
    catch (e) {
        console.error(e)
        res.status(500).json({ errorMessage: 'Invalid token' })
    }
}

module.exports = verifyToken;