const { checkJwt } = require('../helpers/jwt');
const { io } = require('../index');
const { updateConnectedStatusByUser, updateDisconnectedStatusByUser, saveMessages } = require('../controllers/socket');

// Sockets Messages
io.on('connection', async (client) => {
    console.log("Cliente conectado")

    const [isValid, uid] = checkJwt(client.handshake.headers['x-token']);

    if (!isValid) {
        return client.disconnect();
    }
    console.log("Cliente autenticado.");
    await updateConnectedStatusByUser(uid);

    // MEter al usuario en una sala
    client.join(uid);


    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await saveMessages(payload);
        io.to(payload.to).emit('mensaje-personal', payload);
    });



    client.on('disconnect', async () => {
        console.log("Bye Bye!");
        await updateDisconnectedStatusByUser(uid);
    });

});