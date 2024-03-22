const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { red, green } = require("../../../../src/configs/emojis.json");
const Orientation = require("../../../../src/schemas/oryantasyon"); // Orientation modelini projeye dahil ediyoruz

module.exports = {
  conf: {
    aliases: ["ory"],
    name: "oryantasyon-ver",
    help: "oryantasyon-ver @Kullanıcı",
    category: "yetkili",
  },

  run: async (client, message, args) => {
    // Komutun kullanılabilmesi için gerekli yetkileri kontrol ediyoruz
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`)] });
    }

    // Komutun doğru kullanımını kontrol ediyoruz
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Gerçek kullanım: \`.oryantasyon-ver @Kullanıcı\``)] });
    }

    // Kullanıcının oryantasyonunun zaten verilip verilmediğini kontrol ediyoruz
    try {
      const existingOrientation = await Orientation.findOne({ discordId: member.id });

      if (existingOrientation) {
        return message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} ${member} kullanıcısına zaten oryantasyon verilmiş.`)] });
      }

      // Kullanıcıyı veritabanına kaydediyoruz veya güncelliyoruz
      await Orientation.findOneAndUpdate(
        { discordId: member.id },
        { orientationBy: message.author }, // Oryantasyonu veren kişinin Discord tagini kaydediyoruz
        { upsert: true } // Eğer kullanıcı veritabanında bulunmazsa yeni bir kayıt oluşturur
      );

      // Başarılı mesajı gönderiyoruz
      return message.reply({ embeds: [new EmbedBuilder().setDescription(`${green} ${member} kullanıcısına oryantasyon başarıyla verildi.`)] });
    } catch (error) {
      console.error("Oryantasyon verme işlemi sırasında bir hata oluştu:", error);
      return message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Oryantasyon verme işlemi sırasında bir hata oluştu.`)] });
    }
  }
};
