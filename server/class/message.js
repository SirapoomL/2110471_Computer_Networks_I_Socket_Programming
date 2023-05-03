class Author {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
    }
}

class Message {
    constructor(message, author, timestamp, isSticker, stickerId) {
        this.message = message;
        this.author = author;
        this.timestamp = timestamp;
        this.isSticker = isSticker;
        this.stickerId = stickerId;
    }
}

module.exports = {
    Author,
    Message,
};