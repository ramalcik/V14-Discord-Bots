const { Schema, model } = require("mongoose");

const ramal31s = Schema({
    excuse: { type: String, required: true },
    authorID: { type: String, required: true },
    guildID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 172800 },
    date: { type: Date, default: Date.now } // 2 gün sonra silinme (saniye cinsinden)
});

module.exports = model("mazaret", ramal31s);
