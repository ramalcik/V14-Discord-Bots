const { Schema, model } = require("mongoose");

const Channels = Schema({
    _id: String,
    guildID: String,
    channels: Array
});

module.exports = model("Channels", Channels);