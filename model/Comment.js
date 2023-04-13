const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema(
    {
        parentId: { type: String || null },
        userId: { type: String, required: true },
        name: { type: String },
        avatar: { type: String },
        message: { type: String, required: true },
        like: { type: Number || undefined },
        room: { type: String },
    },
    { timestamps: true }
)

const CommentModel = mongoose.model('Comment', Comment)

module.exports = CommentModel
