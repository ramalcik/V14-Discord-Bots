const { Schema, model } = require("mongoose");

const meetingSchema = Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    channelId: { type: String, default: "" },
    endAuthorId: { type: String, default: "" },
    endDate: Date,
    Date: { type: Date, default: Date.now() },
    Joining: { type: Array, default: [] },
    Leaving: { type: Array, default: [] },
    Toplantı: { type: Boolean, default: false },
});

module.exports = model("meeting", meetingSchema);