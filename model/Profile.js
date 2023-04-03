const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Profile = new Schema({
    name: { type: String, required: true },
    avatar: { data: Buffer, contentType: String },
    createAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Profile', Profile)
