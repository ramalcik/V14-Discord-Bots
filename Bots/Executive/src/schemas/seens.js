const { Schema, model } = require("mongoose");

const seen = Schema({
    userID: String,
    lastSeen: {type: Number, default: Date.now()},
    lastOnline: Number,
    lastOffline: Number,
    lastMessage: Number,
    lastVoice: Number,
    lastAvatar: Number,
    lastUsername: Number,
    lastDiscriminator: Number,
    last: {type: Object, default: {}},  
});

module.exports = model("seens", seen);
