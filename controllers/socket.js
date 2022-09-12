const Message = require("../models/Messages");
const User = require("../models/user");

const updateConnectedStatusByUser = async (uid = '') => {
    const userDb = await User.findById(uid);

    if (!userDb) {
        console.log("User not found");
    }

    userDb.online = true;

    await userDb.save();
    return userDb;
}

const updateDisconnectedStatusByUser = async (uid = '') => {
    const userDb = await User.findById(uid);

    if (!userDb) {
        console.log("User not found");
    }

    userDb.online = false;

    await userDb.save();
    return userDb;
}

const saveMessages = async (payload) => {
    try {
        const message = new Message(payload);

        console.log(message);

        await message.save();

        return true;
    } catch (error) {
        return false;
    }
}


module.exports = {
    updateConnectedStatusByUser,
    updateDisconnectedStatusByUser,
    saveMessages
}
