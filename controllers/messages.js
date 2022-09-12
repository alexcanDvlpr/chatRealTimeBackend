const Message = require("../models/Messages");

const findMessageFrom = async (req, res = response) => {
    const myId = req.uid;
    const messageFrom = req.params.from;

    try {

        const last30 = await Message.find({
            $or: [
                { from: myId, to: messageFrom },
                { from: messageFrom, to: myId }
            ]
        })
            .sort('-createdAt')
            .limit(30);
        console.log(last30)

        return res.status(200).send({ ok: true, messages: last30 });
    } catch (error) {
        return res.status(500).send({ ok: false, msg: "Somethin went wrong" })
    }
}

module.exports = {
    findMessageFrom
}