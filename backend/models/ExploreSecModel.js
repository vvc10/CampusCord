
const mongoose = require('mongoose');
const exploreServerSchema = new mongoose.Schema({
    serverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    serverName: {
        type: String,
        required: true
    },
    serverProfile: { // Add this line
        type: String,
        required: false
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ExploreServer', exploreServerSchema);
