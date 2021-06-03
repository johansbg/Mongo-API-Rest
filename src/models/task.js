import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    //Si se necesita mas de uno se usa []
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', taskSchema);