const { Schema, model } = require("mongoose");

const schema = new Schema({
  guildID: { type: String, default: "" },
  SesMod: { type: String, default: "" },
  YetkiliSesMod: { type: String, default: "" }
});


module.exports = model("WelcomeMode", schema);