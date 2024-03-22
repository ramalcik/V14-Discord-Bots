const fs = require('fs');
const path = require('path');

module.exports = {
  conf: {
    aliases: ["ytsil"],
    name: "yt-sil",
    help: "JSON dosyasındaki tüm yetkili rollerini siler",
    category: "admin",
    owner: true,
  },

  run: async (client, message, args) => {
    // Sadece sahip olan kişinin bu komutu kullanmasını sağlayalım
    // JSON dosyasının tam yolu
    const filePath = path.join(__dirname, '../../../../src/configs/yetkili.json');

    // JSON dosyasını okuyalım
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error(error);
      return message.reply("JSON dosyası bulunamadı veya okunamadı!");
    }

    // Tüm yetkili rollerini sil
    for (const key in data) {
      delete data[key];
    }

    // JSON dosyasına güncellenmiş verilerin yazılması
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
        return message.reply("Yetkili rolleri JSON dosyasından silinemedi!");
      }
      message.reply("Tüm yetkili rolleri başarıyla silindi!");
    });
  }
};
