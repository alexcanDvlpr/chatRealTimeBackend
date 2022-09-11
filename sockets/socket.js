const { io } = require('../index');

// Sockets Messages
io.on('connection', client => {
    console.log("Cliente conectado")
    client.on('disconnect', () => console.log("Bye Bye!"));
    client.on('mensaje', (payload) => {
        console.log(payload)

        io.emit('mensaje', { notify: 'mensaje' })
    })
});