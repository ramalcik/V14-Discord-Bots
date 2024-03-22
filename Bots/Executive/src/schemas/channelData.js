const { Schema, model } = require("mongoose");

const schema = Schema({

    guildId: String,
    userId: String,
    date: Number,
    channelData: Array
    });

    module.exports = model("channelData", schema);
    