class User {
    constructor(id, name, profile){
        this.id = id;
        this.name = name;
        this.profile = profile;
    }
}

var users = [];

const newUserConnect = (id, name, profile) => {
    if(users.find((user) => user.id === id) != undefined) return undefined
    const user = new User(id, name, profile)
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