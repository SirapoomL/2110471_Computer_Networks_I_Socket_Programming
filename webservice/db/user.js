class User {
    constructor(id, name, avatar){
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }
}

var users = [];

const newUserConnect = (id, name, avatar) => {
    if(users.find((user) => user.id === id) != undefined) return undefined
    const user = new User(id, name, avatar)
    users.push(user);
    return user;
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getAllUsers = () => {
    return users;
}

const userDisconnect = (id) => {
    console.log(users)
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

module.exports = {
    newUserConnect,
    getUser,
    userDisconnect,
    getAllUsers,
    User, 
}