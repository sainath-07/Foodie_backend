const {Router}=require('express')
const path=require('path')
const verifyToken = require('../middleware/verifytoken')
const { addFirm, deleteFirmById } = require('../controllers/firmcontroller')
const router=Router()

router.post('/add-firm',verifyToken,addFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName= req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
});

router.delete('/:firmId',deleteFirmById)

module.exports=router