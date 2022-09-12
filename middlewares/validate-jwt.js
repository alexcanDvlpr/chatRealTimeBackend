const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async (req, res = response, next) => {
    const token = req.get('x-token');

    if (!token) {
        return res.status(401).send({ msg: 'You need authentication' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: uid });

        if (!user) {
            throw new Error("Something went wrong...")
        }

        req.user = user;
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ msg: "Something went wrong in authentication process." });
    }
}

module.exports = {
    validateJwt
};