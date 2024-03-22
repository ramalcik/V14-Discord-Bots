
const { Schema, model } = require("mongoose");

const schema = Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },

  guildId: {
    type: String,
    required: true // guildId'nin zorunlu olduğunu belirtiyoruz
},

  bakiyeMiktarı: {
    type: Number,
    default: 0
  },

  lastClaimed: {
    type: Date,
    default: 0
  },
  
  transferEdilenMiktarlar: [
    {
      toUserId: String,
      miktar: Number,
      tarih: {
        type: Date,
        default: Date.now
      }
    }
  ]
});


module.exports = model("dinar", schema);
