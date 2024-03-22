const { Schema, model } = require("mongoose");

const schema = Schema({
    userID: { type: String, required: true, unique: true },
    boosterRole: { type: String, default: null },
    oldName: { type: String, default: null }
});

module.exports = model("boosterpanel", schema);
