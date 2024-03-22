const { Schema, model } = require("mongoose");

const schema = Schema({
    husbandID: {
        type: String,
        required: true,
    },
    wifeID: {
        type: String,
        required: true,
    },
    marriedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = model("evlilik", schema);
