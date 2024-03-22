const { Schema, model } = require("mongoose");

const schema = Schema({
    userID: { type: String, required: true }, // Kullanıcının Discord ID'si
    takipEdilenler: [{ type: String }], // Kullanıcının takip ettiği kullanıcıların Discord ID'leri
});

module.exports = model("takip", schema);