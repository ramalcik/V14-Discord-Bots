const { Schema, model } = require("mongoose");

const VoiceChannels = Schema({
    channelID: String,
    name: String,
    bitrate: Number,
    userLimit: Number,
    parentID: String,
    position: Number,
    overwrites: Array,
});

module.exports = model("VoiceChannels", VoiceChannels);
