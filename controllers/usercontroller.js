const Userdetail = require('../model/usermodels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretkey = process.env.secretkey


const userRegister = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await Userdetail.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: 'Vendor has already registered , Please login'
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const newuser = new Userdetail({
            name,
            email,
            password: hashedpassword
        })


        const savednewuser = await newuser.save()

        res.status(200).json({
            message: 'User added successfully',
            savednewuser,

        })

    } catch (error) {
        console.log(error, "catch block")
        res.status(500).json({ errormessage: "internal server error " })
    }
}


const userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Userdetail.findOne({ email })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Entered Email or password doesn't exists in database" })
        }


        const token = jwt.sign({ userId: user._id }, secretkey, { expiresIn: '4h' })
        console.log(token, 'userTOKEN')

        if (!token) {
            return res.status(400).json({ error: "Token not found" })
        }


        const userId = user._id

        res.status(200).json({
            success: 'Login is successfull',
            user,
            token,
            userId,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorMessage: "Internal server error login page" })
    }
}

module.exports = {
    userRegister, userLogin,
}