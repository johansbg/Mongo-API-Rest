import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema);