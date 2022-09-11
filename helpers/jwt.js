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

module.exports = {
    generateJwt
}