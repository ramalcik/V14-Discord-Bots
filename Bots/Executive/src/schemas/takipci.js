const { Schema, model } = require("mongoose");

const schema = Schema({
    userID: { type: String, required: true }, // Kullanıcının Discord ID'si
    takipciler: [{ type: String }], // Kullanıcıyı takip eden kullanıcıların Discord ID'leri
});

module.exports = model("takipci", schema);