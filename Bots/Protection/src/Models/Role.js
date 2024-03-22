const { Schema, model } = require("mongoose");

const Roles = Schema({
    _id: String,
    guildID: String,
    roleID: String,
    name: String,
    color: String,
    hoist: Boolean,
    position: Number,
    permissions: String,
    mentionable: Boolean,
    time: Number,
    members: Array,
    channelOverwrites: Array
});

module.exports = model("Roles", Roles);
