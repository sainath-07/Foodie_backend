const Firm = require('../model/firmmodel')
const Vendor = require('../model/vendormodel')
const multer = require('multer')
const path=require('path')


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId)
        console.log(vendor, 'vendor firmcontroller')

        if (!vendor) {
            res.status(404).json({ message: "Vendor not found." })
        }

        if(vendor.firm.length>1){
            return res.status(404).json({message : "vendor can have only one firm"})
        }
        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        const savedfrim = await firm.save()
        const firmId=savedfrim._id
        vendor.firm.push(savedfrim)
        await vendor.save()

         res.status(200).json({ message: "Firm added successfully",firmId })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "internalServer error" })
    }
}

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deleteFirmById = await Firm.findByIdAndDelete(firmId)

        if (!deleteFirmById) {
            return res.status(400).json({ error: "Product not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}


//if we have image export in this way as below..
module.exports = { 
    addFirm: [upload.single('image'), addFirm] ,
    deleteFirmById
}