const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  conf: {
    aliases: ["ytekle"],
    name: "rol-ekle",
    help: "Rol ekler ve JSON dosyasına kaydeder",
    category: "admin",
    owner: true,
  },

  run: async (client, message, args) => {
    // Komutu sadece yetkili kişilerin kullanmasını sağlayalım
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply("Bu komutu kullanma yetkiniz yok!");

    // Kullanıcıdan rol adı ve rol ID'si alınması
    const roleName = args[0];
    const roleID = args[1];

    // Gerekli argümanların sağlanmadığını kontrol edelim
    if (!roleName || !roleID) return message.reply("Lütfen rol adını ve rol ID'sini belirtin!");

    // Verileri bir obje olarak oluşturalım
    const roleData = {
      roleName: roleName,
      roleID: roleID
    };

    // JSON dosyasının tam yolu
    const filePath = path.join(__dirname, '../../../../src/configs/yetkili.json');

    // Önce JSON dosyasındaki verileri okuyalım
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error(error);
      return message.reply("JSON dosyası bulunamadı veya okunamadı!");
    }

    // Yeni rolü ekleyelim
    data[roleName] = [roleID];

    // JSON dosyasına verilerin yazılması
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
        return message.reply("Rol bilgileri JSON dosyasına kaydedilemedi!");
      }
      message.reply(`Rol başarıyla eklendi: ${roleName} - ${roleID}`);
    });
  }
};
