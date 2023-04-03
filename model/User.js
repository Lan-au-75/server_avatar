const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    createAt: { type: Date, default: Date.now },
})

const DetailUser = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    phone: { type: String },
    createAt: { type: Date, default: Date.now },
})

const UserModel = mongoose.model('User', User)

const DetailUserModel = mongoose.model('DetailUser', DetailUser)

module.exports = { UserModel, DetailUserModel }
