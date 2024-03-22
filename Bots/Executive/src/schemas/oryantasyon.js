const { Schema, model } = require("mongoose");

const schema = Schema({
    discordId: {
        type: String,
        required: true,
        unique: true // Her kullanıcının yalnızca bir kez kaydedilmesini sağlamak için unique olarak işaretliyoruz
      },
      orientationBy: {
        type: String,
        required: true
      }
})

module.exports = model("oryantasyon", schema);
