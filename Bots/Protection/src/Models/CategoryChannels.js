const { Schema, model } = require("mongoose");

const CategoryChannels = Schema({
    channelID: String,
    name: String,
    position: Number,
    overwrites: Array,
});

module.exports = model("CategoryChannels", CategoryChannels);
