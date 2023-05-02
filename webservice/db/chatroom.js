class ChatRoom {
    constructor(roomName, users) {
        this.roomName = roomName;
        this.users = users;
    }
}

var chatrooms = [];

const addChatRoom =  (roomName) => {
    if(chatrooms.find(function (chatroom) { return chatroom.roomName === roomName; }) != undefined) return undefined
    let newChatRoom = {
        roomName: roomName,
        users: []
    };
    chatrooms.push(newChatRoom);
    return newChatRoom;
};

const removeChatRoom = (roomName) => {
    var index = chatrooms.findIndex(function (chatroom) { return chatroom.roomName === roomName; });
    if (index !== -1) {
        return chatrooms.splice(index, 1)[0];
    }
}

const userJoinChatRoom = (roomName, user) => {
    const chatroom = chatrooms.find((chatroom) => chatroom.roomName === roomName);
    if(chatroom){
        chatroom.users.push(user);
        return chatroom;
    }
}

const userLeaveChatRoom = (roomName, id) => {
    if(roomName = undefined) return undefined
    const chatroom = chatrooms.find((chatroom) => chatroom.roomName === roomName);
    if(chatroom){
        const index = chatroom.users.findIndex((user) => user.id === id);
        if(index !== -1){
            return chatroom.users.splice(index, 1)[0];
        }
    }
}

const getChatRooms = () => {
    return chatrooms;
}

module.exports = {
    addChatRoom,
    removeChatRoom,
    userJoinChatRoom,
    userLeaveChatRoom,
    getChatRooms,
    ChatRoom,
}
