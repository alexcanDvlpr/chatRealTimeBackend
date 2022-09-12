const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const { generateJwt } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {
        const userInDb = await User.findOne({ email });

        if (userInDb) {
            return res.status(400).send({ msg: `There is an account with email ${email}.` });
        }

        const user = new User({
            name,
            email,
            password
        });


        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        const token = await generateJwt(user._id);

        await user.save();
        return res.status(201).send({ msg: "User created", user, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });
    }

}

const signIn = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userWithSameEmail = await User.findOne({ email });

        if (!userWithSameEmail) {
            return res.status(404).send({ msg: "Email or password are incorrect." });
        }

        const validPassword = bcrypt.compareSync(password, userWithSameEmail.password);

        if (!validPassword) {
            return res.status(404).send({ msg: "Email or password are incorrect." });
        }

        const token = await generateJwt(userWithSameEmail._id);

        return res.status(200).send({ ok: true, user: userWithSameEmail, token });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const renew = async (req, res = response) => {

    const user = req.user;

    if (!user) {
        return res.status(401).send({ msg: "Something went wrong" });
    }

    const newToken = await generateJwt(user._id);

    return res.status(200).send({ ok: true, user, token: newToken });
}

module.exports = {
    createUser,
    signIn,
    renew
}