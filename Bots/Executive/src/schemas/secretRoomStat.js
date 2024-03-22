const { Schema, model } = require("mongoose");

const schema = Schema({
    User: { type: String, default: "" },
    Room: { type: String, default: "" },
    Duration: { type: Number, default: 0 }
});

module.exports = model("secretRoomStat", schema);