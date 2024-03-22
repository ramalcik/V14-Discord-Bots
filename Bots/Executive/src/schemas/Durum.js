const { Schema, model } = require("mongoose");

const schema = Schema({
    userID: { type: String, required: true },
    durum: { type: String, default: "Durum mesajı bulunmuyor." }
});

module.exports = model("Durum", schema);