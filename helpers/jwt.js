const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                reject(new Error(err.message));
            } else {
                resolve(token);
            }
        });
    });
}


const checkJwt = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        return [true, uid];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}

module.exports = {
    generateJwt,
    checkJwt
}