const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const logger = require("morgan");
const moment = require("moment");
const dotenv = require("dotenv");
dotenv.config();

const { newUserConnect, getUser, userDisconnect, getAllUsers } = require('./db/user');
const { initChatRoomEvents, initUserEvents } = require("./mysocketio");
const { userLeaveChatRoom, getChatRooms } = require("./db/chatroom");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { /* options */ });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());

app.use('/', (req, res, next) => {
    res.send("Hello World");
})

io.on('connection', (socket) => {
    console.log(`client connected : ${socket.id}`)

    initChatRoomEvents(io, socket);
    initUserEvents(io, socket);
    
    if(true){
        socket.use(([event, ...args], next) => {
        console.log(`${event} : ${socket.id}`)
        next();
        });
    }

    socket.on('disconnect', ()=> {
        userDisconnect(socket.id);
        let room_id = socket.hasOwnProperty('roomId') ?  socket.roomId : 'unknown'
        userLeaveChatRoom(socket.roomName, socket.id)
        console.log(`client disconnected : ${socket.id} from room ${room_id}`)
        io.emit('server-user-disconnected', { data: getAllUsers() })
    })

    socket.emit('ready', {
        chatRooms : getChatRooms(),
        users: getAllUsers(),
        mySocketId : socket.id
    })
})

const PORT = process.env.PORT || 6789;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

exports.app = app;
exports.io = io;