const { newUserConnect, getUser, getAllUsers, userDisconnect, User } = require('./db/user');
const { addChatRoom, removeChatRoom, userJoinChatRoom, userLeaveChatRoom, getChatRooms } = require('./db/chatroom');

const initChatRoomEvents = (io, socket) => {
  socket.on('client-send-message', ({message, roomName}) => {
    console.log(message, roomName);
    message.timestamp = Date.now();
    if(roomName) {
      message.echoBack = false;
      socket.broadcast.to(roomName).emit('server-send-message', message);
      message.echoBack = true;
      socket.emit('server-echo-message', message);
    }
    //else io.emit('server-send-message', message);
  })

  socket.on('client-create-room', ({roomName, user}) => {
    let newRoom = addChatRoom(roomName);
    if(newRoom) io.emit('server-room-created', { data: getChatRooms() });
    else socket.emit('server-room-duplicate', { data: getChatRooms() });
  })

  socket.on('client-join-room', ({roomName, user}) => {
    socket.join(roomName);
    userJoinChatRoom(roomName, new User(socket.id, user.name, user.profile));
    socket.roomName = roomName;
    socket.emit('server-room-joined', { roomName });
    socket.broadcast.to(roomName).emit('server-user-joined-room', { data: getChatRooms() });
  })

  socket.on('client-leave-room', ({roomName}) => {
    socket.leave(roomName);
    userLeaveChatRoom(roomName, socket.id);
    socket.roomName = undefined
    socket.emit('server-room-left', { roomName });
    socket.broadcast.to(roomName).emit('server-user-left-room', { data: getChatRooms() });
  })

  socket.on('client-send-dm', ({message, receiverId}) => {
    console.log(message, receiverId)
    console.log(getAllUsers())
    message.timestamp = Date.now();
    message.echoBack = false;
    io.to(receiverId).emit('server-send-dm', {message, senderId: socket.id});
    message.echoBack = true;
    socket.emit('server-echo-dm', message);
  })
}

const initUserEvents = (io, socket) => {
  socket.on('client-set-user', (user) => {
    newUserConnect(socket.id, user.name, user.profile);
    io.emit('server-new-user', { data: getAllUsers() });
  })
}


module.exports = {
  initChatRoomEvents,
  initUserEvents,
};