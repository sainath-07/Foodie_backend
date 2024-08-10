const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   
});

// Collection name: Userdetail
const Userdetail = mongoose.model('Userdetail', userSchema);
module.exports = Userdetail;