const User = require("../models/user");

const findUsers = async (req, res = response) => {
    try {
        const from = Number(req.query.from) || 0;
        const allUsers = await User.find({
            _id: {
                $ne: req.uid
            }
        })
            .sort('-online')
            .skip(from);

        return res.status(200).send({ ok: true, users: allUsers })
    } catch (error) {
        return res.status(500).send({ msg: "Error" });
    }
}

module.exports = {
    findUsers
}