const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { Server } = require("socket.io");
const { createServer } = require("http");
const moment = require("moment");
const { date_time_format } = require("./utils/Utils");
const { newUserConnect, getUser, userDisconnect, getAllUsers } = require('./db/user');
const { initChatRoomEvents, initUserEvents } = require("./mysocketio");
const { userLeaveChatRoom, getChatRooms } = require("./db/chatroom");

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, { /* options */ });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());

// Error handler
/**
 * errorHandler
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err?.code || err?.status || 500;
  
    return res.status(statusCode).json({
      code: statusCode,
      message: err?.message || "Error",
    });
};
app.use(errorHandler);
app.use('/', (req, res, next) => {
    res.send("Hello World");
})

io.on('connection', (socket) => {
    console.log(`[${moment().format(date_time_format[0])}] client connected : ${socket.id}`)

    //TODO: Init Event Listeners
    initChatRoomEvents(io, socket);
    initUserEvents(io, socket);
    
    // use log middleware
    if(true){
        socket.use(([event, ...args], next) => {
        console.log(`[${moment().format(date_time_format[0])}] ${event} : ${socket.id}`)
        next();
        });
    }        

    socket.on('ping',() => {
        socket.emit('pong', {
            message : "pong!"
        })
    })

    socket.on('disconnect', ()=> {
        userDisconnect(socket.id);
        let room_id = socket.hasOwnProperty('roomId') ?  socket.roomId : 'unknown'
        userLeaveChatRoom(socket.roomName, socket.id)
        console.log(`[${moment().format(date_time_format[0])}] client disconnected : ${socket.id} from room ${room_id}`)
        io.emit('server-user-disconnected', { data: getAllUsers() })
    })

    // event listeners have been initialized and ready to go
    socket.emit('ready', {
        chatRooms : getChatRooms(),
        users: getAllUsers(),
        mySocketId : socket.id
    })
})

const PORT = process.env.PORT || 2001;
server.listen(PORT, ()=> {
    const PORT = process.env.PORT || 2001;
    console.log(`server running on port ${PORT}...`)
    console.log(moment().format(date_time_format[0]))
})


exports.app = app;
exports.io = io;