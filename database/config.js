
const mongoose = require('mongoose');

const initDatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to Db Online");

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la bbdd', error);
    }
}

module.exports = {
    initDatabaseConnection
}