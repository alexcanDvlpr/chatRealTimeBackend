const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Db config
const { initDatabaseConnection } = require('./database/config');
initDatabaseConnection();

// Express Server
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server is running on port ${process.env.PORT}`);
});