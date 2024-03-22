const { Schema, model } = require("mongoose");

const SafeMember = Schema({
    _id: String,
    guildID: String,
    Full: {type: Array, default: []},
    RoleAndChannel: {type: Array, default: []},
    Role: {type: Array, default: []},
    Channel: {type: Array, default: []},
    Bot: {type: Array, default: []},
    BanAndKick: {type: Array, default: []},
    ChatG: {type: Array, default: []},
    SekmeG: {type: Array, default: []},
    SafeRole: {type: Array, default: []},
    Permissions: {type: Array, default: []}
});

module.exports = model("SafeMember", SafeMember);
