const { Schema, model } = require('mongoose');

const MessagesSchema = Schema({
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
}, { timestamps: true });

MessagesSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
});


module.exports = model("Message", MessagesSchema);