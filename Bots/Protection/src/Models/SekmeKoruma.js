const { Schema, model } = require("mongoose");

const SekmeKoruma = Schema({
    guildID: String, 
    userID: String, 
    roles: Array
});

module.exports = model("SekmeKoruma", SekmeKoruma);
