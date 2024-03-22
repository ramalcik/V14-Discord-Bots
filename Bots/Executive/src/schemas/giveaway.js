const { Schema, model } = require("mongoose");

const schema = Schema({
    messageID: { type: String, default: "" },
    katilan: { type: Array, default: [] },
});

module.exports = model("giveaway", schema);