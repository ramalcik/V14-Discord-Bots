const { Schema, model } = require("mongoose");

const schema = Schema({
    ID: { type: String, default: "" },
    Owner: { type: String, default: "" },
    Name: { type: String, default: "" }, 
    Password: { type: String, default: "" },
    Users: { type: Array, default: [] },
    Duration: { type: Number, default: 0 },
    LastJoin: { type: Number, default: 0 },
    MaxUser: { type: Number, default: 0 }
});

module.exports = model("secretRoom", schema);