const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: String,
        enum: ['Happy', 'Okay', 'Sad'],
        required: true
    },
    energy: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CheckIn', checkInSchema);
