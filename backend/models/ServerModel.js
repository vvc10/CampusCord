const ServerSchema = new mongoose.Schema({
    serverName: {
        type: String,
        default: 'New Server'
    },
    ServerProfile: {
        type: String,
        required: false,
        default: 'server.jpg'
    },
    admin: {
        type: Array,
        required: true
    },
    channelAvailable: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    members: {
        type: Array,
        default: []
    },
    isPublic: {  
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Server', ServerSchema);
