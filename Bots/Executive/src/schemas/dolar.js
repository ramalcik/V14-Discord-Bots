const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  hesap: { type: Array, default: [] },
  dolar: { type: Number, default: 0 },
  dolarTime: { type: Number, default: 0 } 
});

module.exports = model("dolar", schema);
