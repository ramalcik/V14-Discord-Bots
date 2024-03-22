const { Schema, model } = require("mongoose");

const TextChannels = Schema({
    channelID: String,
    name: String,
    nsfw: Boolean,
    parentID: String,
    position: Number,
    rateLimit: Number,
    overwrites: Array,
});

module.exports = model("TextChannels", TextChannels);
