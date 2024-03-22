const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  komutAd: { type: String, default: "" },
  kullanımKanal: { type: String, default: "" },
  YetkiliRol: { type: Array, default: [] },
  verilecekRol: { type: Array, default: [] }
});

module.exports = model("talentPerms", schema);