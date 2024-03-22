const { Schema, model } = require("mongoose");

const schema = Schema({
    guildID: { type: String, default: "" },
    crewHouse: {type: Array, default: ""},
    tarih: { type: String, default: "" }
});

module.exports = model("ekip", schema);