const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  kullanici: {type: Array, default: []},
});

module.exports = model("bannedcmd", schema);