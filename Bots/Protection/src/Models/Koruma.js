const { Schema, model } = require("mongoose");

const Koruma = Schema({
    _id: String,
    guildID: String,
    Role: String,
    Permissions: String,
});

module.exports = model("Koruma", Koruma);
