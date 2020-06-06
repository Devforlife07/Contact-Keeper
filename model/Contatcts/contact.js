const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ContactSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserContactKeeper"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    phone: {
        type: String,
        default: "Personal"
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Contacts", ContactSchema)