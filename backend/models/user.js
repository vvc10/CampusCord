const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true,
        default: 'user.jpg'
    },
    userConfirmed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    servers: [
        {
            type: mongoose.Schema.Types.ObjectId,  // Use ObjectId to reference Server documents
            ref: 'Server'  // Reference the Server model
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
