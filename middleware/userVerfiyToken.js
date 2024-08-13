const Userdetail = require('../model/usermodels')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretkey = process.env.secretkey

const userverifytoken = async (req, res, next) => {
    const token = req.headers.token
    // console.log(token, 'token_userverifytoken file')

    if (!token) {
        return res.status(400).json({ error: "Token is required" })
    }

    try {
        const decoded = jwt.verify(token, secretkey)

        // console.log(decoded, 'decoded_      userverifytokenfile')

        const user = await Userdetail.findById(decoded.userId)

        // console.log(user, 'user_userverifytokenfile')

        if (!user) {
            return res.status(404).json({
                error: 'User Not found'
            })
        }


        req.userId = user._id
        next()
    } catch (error) {
        console.error(error,'userverifytoken')
        res.status(500).json({ errorMessage: 'Invalid token' })
    }
}


module.exports=userverifytoken