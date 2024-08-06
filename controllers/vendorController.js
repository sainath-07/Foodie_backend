const Vendor = require('../model/vendormodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretkey = process.env.secretkey


const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const vendor = await Vendor.findOne({ email })

        if (vendor) {
            return res.status(400).json('Email already exists')
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const newvendor = new Vendor({
            username,
            email,
            password: hashedpassword
        });
        const savenewvendor = await newvendor.save()
        res.status(201).json({
            message: "vendor added successfully",
            savenewvendor
        })
        console.log('registred')
    }
    catch (error) {
        console.log(error, "catch block")
        res.status(500).json({ errormessage: "internal server error " })
    }
}

const vendorLogin = async (req, res) => {

    const { email, password } = req.body
    try {
        const vendor = await Vendor.findOne({ email })
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(400).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretkey, { expiresIn: "1h" })
        const vendorId = vendor._id
        res.status(200).json({ success: "Loign successfull", token, vendorId, vendor })
        console.log(email, 'successfully login')
        console.log(token, 'this is token')
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ errorMessage: "Internal server error" })
    }
}

const getallvendors = async (req, res) => {
    try {

        const vendor = await Vendor.find().populate('firm')
        // console.log(vendor,'getall vendors')
        res.status(200).json({
            vendorLength: vendor.length,
            vendor
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}

const getsinglevendors = async (req, res) => {
    const vendorId = req.params._id

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if (!vendor) {
            return res.status(400).json({ errorMessage: "vendor not found" })
        }

        const vendorFirmId = vendor.firm[0]._id
        res.json({ vendorId, vendorFirmId, vendor })
    }
    catch (error) {
        res.status(500).json({
            statusMessage: "internal server error",
            error
        })
    }
}


module.exports = {
    vendorRegister,
    vendorLogin,
    getallvendors,
    getsinglevendors,
}