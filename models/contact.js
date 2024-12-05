const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        Required: true,
    },
    email:{
        type: String,
        Required: true,
    },
    phone:{
        type: String,
        Required: true,
    },
    message:{
        type: String,
        Required: true,
    },
    user_id:{
        type: String,
        Required: true,
    },
    status:{
        type: String,
        default:"Pending",
    },
    comment:{
        type: String,
        default:"Pending",
    },
},{timestamps: true})
const ContactModel = mongoose.model('contact', ContactSchema)
module.exports = ContactModel