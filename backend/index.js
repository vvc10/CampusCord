const express = require('express');
const app = express();
var url = require('./url.json')
require('dotenv').config()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origins: url.frontend, credentials: true } })
const mongo = require('./db')
const cors = require('cors');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const fs = require('fs/promises');
const Fs = require('fs');
const { uuid } = require('uuidv4');
var morgan = require('morgan')
mongo()
const User = require('./models/user')
const ServerModel = require('./models/ServerModel')
const ChannelModel = require('./models/ChannelModel')
const ChatModel = require('./models/ChatModel')
const ActiveVoiceChat = require('./models/ActiveVideoChatsModel')
const path = require("path");
app.use(cors({ origin: url.frontend, credentials: true }))
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({ cookie: { sameSite: 'lax' }, secret: process.env.COOKIE_SECRET, resave: true, saveUninitialized: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.use(fileUpload({}));
app.use(express.static('usercontent'))
require('./passportConfig')(passport)
function handleValidation(a) {
    let email = a.email
    let username = a.username
    let password = a.password
    let fields = { email, username, password };
    let formIsValid = true;
    if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
        }
    }
    if (fields["username"] === '') {
        formIsValid = false;
    }
    if (typeof fields["email"] !== "undefined") {
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
        }
    }
    if (fields["email"] === "") {
        formIsValid = false;
    }
    if (fields['password'].length < 8) {
        formIsValid = false;
    }
    return formIsValid;
}
app.post('/auth/register', async (req, res) => {
    console.log(req.body)
    if (handleValidation(req.body)) {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            let hashed = await bcrypt.hash(req.body.password, 12)
            user = User.create({ email: req.body.email, displayName: req.body.displayName, password: hashed })
            res.send({ error: null })
        } else {
            res.send({ error: 'user exists' })
        }
    } else {
        res.send({ error: 'not valid' }).status(401);
    }
})
app.post('/auth/login', (req, res, next) => {
    passport.authenticate("local", { session: true }, (err, user, info) => {
        if (err) throw err;
        if (!user) res.send({ error: 'invalid credentials' });
        else {
            req.login(user, (err) => {
                if (err) throw err;
                res.send({ error: null });
            });
        }
    })(req, res, next);
});
app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        let data = { id: req.user._id, name: req.user.displayName, email: req.user.email, profile: req.user.image, server: req.user.servers }
        res.send(data)
    } else {
        res.send('')
    }
})
app.post('/api/register/server', async (req, res) => {
    if (req.isAuthenticated()) {
        const { name, admin, isPublic } = req.body;
        console.log(name, admin, isPublic);

        if (!name || !admin) {
            return res.send({ error: 'invalid' });
        }

        try {
            // Create a new server in the "ServerModel"
            let server = await ServerModel.create({
                serverName: name,
                admin: [admin],  // Ensure admin is stored as an array
                members: [admin],  // Include the admin as the first member
                isPublic: isPublic  // Save the isPublic flag
            });

            // Add the server to the user's server list
            let user = await User.findOne({ _id: admin });
            if (!user) {
                return res.send({ error: 'invalid user' });
            } else {
                user.servers.push(server._id);
                await user.save();

                // If the server is public, save it to the "test.explore_sec" collection
                if (isPublic) {
                    let exploreServer = new ExploreSecModel({
                        serverId: server._id,
                        serverName: name,
                        serverProfile: server.ServerProfile // Assuming the profile comes from the server
                    });
                    await exploreServer.save();
                }

                return res.send({ status: 'done', serverId: server._id });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Server creation failed' });
        }
    } else {
        res.status(401).send({ error: 'not authenticated' });
    }
});

app.post('/api/get/server', async (req, res) => {
    if (req.isAuthenticated()) {
        let id = req.body.id
        let serverData = []
        let user = await User.findOne({ _id: id })
        if (!user) res.send({ error: 'invalid user' })
        let servers = user.servers
        for (var i = 0; i < servers.length; i++) {
            await ServerModel.findOne({ _id: servers[i] }, (err, server) => {
                if (err) throw err
                serverData.push(server);
            })
        }
        res.send({ error: 'null', servers: serverData })
    } else {
        res.send({ error: 'not authenticated' }).status(401)
    }
})
app.post('/api/get/channel', async (req, res) => {
    if (req.isAuthenticated()) {
        let id = req.body.id
        let channelData = []
        let server = await ServerModel.findOne({ _id: id })
        if (!server) res.send({ error: 'invalid server' })
        try {
            let channels = server.channelAvailable
            for (var i = 0; i < channels.length; i++) {
                await ChannelModel.findOne({ _id: channels[i] }, (err, c) => {
                    if (err) throw err
                    channelData.push(c);
                })
            }
            res.send({ error: null, channels: channelData })
        } catch (err) {
            throw err
        }
    } else {
        res.send({ error: 'not authenticated' }).status(401)
    }
})
app.post('/api/register/channel', async (req, res) => {
    if (req.isAuthenticated()) {
        let name = req.body.name;
        let _id = req.body.parent;
        let type = req.body.type; // Assign the type directly from the request body

        if (name === '' || _id === '' || !['text', 'voice', 'notes', 'notice', 'posts'].includes(type)) { // Validate the type
            res.send({ error: 'invalid' });
        } else {
            let channel = await ChannelModel.create({ channelName: name, parent: _id, channelType: type });
            ServerModel.findOne({ _id: _id }, (err, serverfound) => {
                if (err) throw err;
                serverfound.channelAvailable.push(channel._id);
                serverfound.save();
                res.send({ status: 'done' });
                if (type === 'voice') {
                    ActiveVoiceChat.create({
                        channelId: channel._id,
                    });
                }
            }).catch(err => { throw err });
        }
    } else {
        res.send({ error: 'not authenticated' }).status(401);
    }
});

app.post('/api/get/member', async (req, res) => {
    let id = req.body.id
    let server = await ServerModel.findOne({ _id: id })
    if (!server) res.send({}).status(404)
    let UserData = []
    for (var i = 0; i < server.members.length; i++) {
        await User.findOne({ _id: server.members[i] }, (err, c) => {
            if (err) throw err
            let data = { name: c.displayName, profile: c.image, id: c._id }
            UserData.push(data);
        }).catch(err => { throw err })
    }
    res.send({ error: null, users: UserData })
})
app.post('/api/get/chat', async (req, res) => {
    if (req.isAuthenticated) {
        const id = req.body.channelId
        let chats = await ChatModel.find({ channel: id })
        for (var i = 0; i < chats.length; i++) {
            let user = await User.findOne({ _id: chats[i].by })
            chats[i]["senderProfile"] = user.image
            chats[i].by = user.displayName
        }
        res.send({ error: null, chat: chats })
    } else {
        res.send({ error: 'not authenticated' }).status(401)
    }
})
app.post('/update/userdata', async (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.files)
        const fname = req.files.image
        var path;
        if (fname.mimetype === "image/jpeg") path = 'profile/' + req.user.id + ".jpg";
        if (fname.mimetype === "image/png") path = 'profile/' + req.user.id + ".png";
        if (fname.mimetype === "image/gif") path = 'profile/' + req.user.id + ".gif";
        fname.mv(__dirname + "/usercontent/" + path, async (error) => {
            if (error) {
                console.error(error)
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({ status: 'error', message: error }))
                return
            }
            else {
                await User.findOne({ _id: req.user.id }, (err, user) => {
                    if (err) throw err
                    user.image = path;
                    user.save()
                }).catch(err => { throw err })
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({ status: 'Uploaded' }))
        })
    }
})
app.post('/get/active-peers', async (req, res) => {
    if (req.isAuthenticated) {
        const id = req.body.id;

        try {
            const channel = await ActiveVoiceChat.findOne({ channelId: id }).exec();

            if (!channel) {
                return res.status(404).send({ error: 'Channel not found', data: null });
            }

            let UserData = [];
            for (let i = 0; i < channel.members.length; i++) {
                try {
                    const user = await User.findOne({ _id: channel.members[i] }).exec();
                    if (user) {
                        let data = { displayName: user.displayName, image: user.image, key: user._id };
                        UserData.push(data);
                    } else {
                        console.log(`User with ID ${channel.members[i]} not found.`);
                        // Handle this scenario as per your application's requirements
                    }
                } catch (err) {
                    console.error(`Error fetching user: ${err.message}`);
                    return res.status(500).send({ error: 'Internal server error', data: null });
                }
            }
            res.send({ error: null, data: UserData });
        } catch (err) {
            console.error(`Error finding channel: ${err.message}`);
            return res.status(500).send({ error: 'Internal server error', data: null });
        }
    } else {
        res.status(401).send({ error: 'Unauthorized', data: null });
    }
});
app.post('/update/active-peers', async (req, res) => {
    if (req.isAuthenticated) {
        const userId = req.body.userId
        const channelId = req.body.channelId
        await ActiveVoiceChat.findOne({ channelId: channelId }, async (err, channel) => {
            if (err) throw err;
            await channel.members.splice(channel.members.indexOf(userId), 1)
            channel.save()
            res.send({ error: null })
        })
    }
})
app.post('/update/server', async (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body)
        const fname = req.files.image
        const serverId = req.body.serverId
        var path;
        if (fname.mimetype === "image/jpeg") path = 'serverProfile/' + serverId + ".jpg";
        if (fname.mimetype === "image/png") path = 'serverProfile/' + serverId + ".png";
        if (fname.mimetype === "image/gif") path = 'serverProfile/' + serverId + ".gif";
        fname.mv(__dirname + "/usercontent/" + path, async (error) => {
            if (error) {
                console.error(error)
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({ status: 'error', message: error }))
                return
            }
            else {
                await ServerModel.findOne({ _id: serverId }, (err, server) => {
                    if (err) throw err
                    server.ServerProfile = path;
                    server.save()
                }).catch(err => { throw err })
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({ status: 'Uploaded' }))
        })
    }
})
app.post('/upload-file', async (req, res) => {
    if (req.isAuthenticated) {
        const file = req.files.file
        let folder = "files/"
        let Fileid = uuid()
        var fileExt = file.name.split('.').pop();
        while (Fs.existsSync("./usercontent/" + folder + Fileid + '.' + fileExt)) {
            Fileid = uuid()
        }
        console.log(file)
        file.mv("./usercontent/" + folder + Fileid + "." + fileExt, async (error) => {
            if (error) {
                console.error(error)
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({ status: 'error', message: error }))
                return
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({ status: 'Uploaded', data: folder + Fileid + "." + fileExt }))
        })
    }
})
// Fetch authenticated user data
app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        const userData = {
            id: req.user._id,
            name: req.user.displayName,
            email: req.user.email,
            profile: req.user.image,
            server: req.user.servers
        };
        res.send(userData);
    } else {
        res.send('');
    }
})

app.get('/join/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Sign in required');
    }

    const serverId = req.params.id;
    const userId = req.user.id;

    try {
        // Find and update the user
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.servers.includes(serverId)) {
            user.servers.push(serverId);
            await user.save();
        }

        // Find and update the server
        let server = await ServerModel.findOne({ _id: serverId });
        if (!server) {
            return res.status(404).send('Server not found');
        }

        if (!server.members.includes(userId)) {
            server.members.push(userId);
            await server.save();
            io.sockets.to(serverId).emit("member-joined", serverId, userId);
            return res.send('Joined successfully');
        } else {
            return res.send('Already a member');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "usercontent", "index.html"));
})
io.on('connection', socket => {
    console.log(socket.client.conn.server.clientsCount)
    console.log(socket.rooms)
    io.emit('joined')
    socket.on('send-msg', (msg, channelId, userId, serverId) => {
        console.log(msg, channelId, userId)
        User.findOne({ _id: userId }, (err, user) => {
            if (err) throw err
            socket.to(channelId).emit('msg', [msg, user.displayName, user.image, channelId, Date.now(), userId, "text"])
            socket.to(serverId).emit('new-msg', [msg, user.displayName, user.image, Date.now(), channelId, userId])
            let chat = ChatModel.create({ message: msg, channel: channelId, senderId: userId, by: userId })
        })
    })
    socket.on('message-with-file', (name, size, src, msg, channelId, userId, serverId) => {
        User.findOne({ _id: userId }, (err, user) => {
            if (err) throw err
            // socket.to(userId).emit('msg', [msg, user.displayName, user.image, channelId, Date.now(), userId, "file"])
            socket.to(channelId).emit('msg', [msg, user.displayName, user.image, channelId, Date.now(), userId, "file", { name: name, size: size, src: src }])
            socket.to(serverId).emit('new-msg', [msg, user.displayName, user.image, Date.now(), channelId, userId])
            let chat = ChatModel.create({ message: msg, channel: channelId, senderId: userId, by: userId, filedata: { name: name, size: size, src: src }, type: "file" })
        })
    })
    socket.on('authenticate', (cookie) => {
        console.log("authenticate" + cookie)
    })
    socket.on('join-room', channelId => {
        socket.join(channelId)
        socket.broadcast.to(channelId).emit('user-connected')
    })
    socket.on('server-connected', server => {
        console.log(socket.rooms)
        socket.join(server)
        console.log(server)
    })
    socket.on('channel-created', serverId => {
        console.log(serverId)
        socket.to(serverId).emit('new-channel', serverId)
    })
    socket.on('voice-chat-join', async (serverId, channelId, peerId, userId) => {
        console.log(channelId, peerId)
        socket.join(channelId)
        socket.to(channelId).emit('voice-chat-new-user', channelId, peerId)
        let data = { image: '', displayName: '', key: '' }
        await User.findOne({ _id: userId }, (err, user) => {
            if (err) throw err;
            data['image'] = user.image;
            data['displayName'] = user.displayName
            data['key'] = user._id
        })
        ActiveVoiceChat.findOne({ channelId: channelId }, (err, channel) => {
            if (err) throw err;
            if (!channel.members.includes(userId)) {
                channel.members.push(userId)
                channel.save()
                socket.to(serverId).emit('voice-chat-update-user-list', channelId, data, userId, true)
            }
        })
    })
    socket.on("voice-chat-disconnect", (channelId, userId, serverId) => {
        console.log(serverId)
        socket.leave(channelId);
        data = {}
        socket.to(serverId).emit('voice-chat-update-user-list', channelId, data, userId, false)
    })
})
server.listen(4000, (console.log('Server Started')))