const Takip = require('../../../../src/schemas/takip'); // Schema dosyanızın yolunu düzgün şekilde belirtmelisiniz.
const Takipci = require("../../../../src/schemas/takipci")
module.exports = {
  conf: {
    aliases: ["takip", "takipçıkar"],
    name: "takipet",
    help: "Belirli bir kullanıcıyı takip et veya takipten çıkar.",
    category: "kullanıcı",
  },

  run: async (client, message, args, embed, prefix) => {
    const subcommand = args[0];
    const targetUser = message.mentions.users.first() || client.users.cache.get(args[1]);
    
    if (!subcommand || !targetUser) {
      return message.channel.send(`Geçerli bir alt komut ve hedef kullanıcı belirtmelisiniz. Örnek kullanım: \`.takipet et @kullanıcı\``);
    }

    const userID = message.author.id;
    const takipEdilenID = targetUser.id;

    // Takip et alt komutu
    if (subcommand === "et") {
      try {
        let takip = await Takip.findOne({ userID });
        if (!takip) {
          takip = await Takip.create({ userID, takipEdilenler: [takipEdilenID] });
        } else {
          if (!takip.takipEdilenler.includes(takipEdilenID)) {
            takip.takipEdilenler.push(takipEdilenID);
            await takip.save();
          } else {
            return message.channel.send(`Bu kullanıcıyı zaten takip ediyorsunuz.`);
          }
        }
        // Takipçiye ekle
        let takipci = await Takipci.findOne({ userID: takipEdilenID });
        if (!takipci) {
          takipci = await Takipci.create({ userID: takipEdilenID, takipciler: [userID] });
        } else {
          if (!takipci.takipciler.includes(userID)) {
            takipci.takipciler.push(userID);
            await takipci.save();
          }
        }
        return message.channel.send(`${targetUser} başarıyla takip ediliyor.`);
      } catch (error) {
        console.error(error);
        return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
      }
    }

    // Takipçiden çıkar alt komutu
    if (subcommand === "çıkar") {
      try {
        const takip = await Takip.findOne({ userID });
        if (!takip || !takip.takipEdilenler.includes(takipEdilenID)) {
          return message.channel.send(`Bu kullanıcıyı zaten takip etmiyorsunuz.`);
        }
        takip.takipEdilenler = takip.takipEdilenler.filter(id => id !== takipEdilenID);
        await takip.save();
        
        // Takipçiden kaldır
        const takipci = await Takipci.findOne({ userID: takipEdilenID });
        if (takipci && takipci.takipciler.includes(userID)) {
          takipci.takipciler = takipci.takipciler.filter(id => id !== userID);
          await takipci.save();
        }

        return message.channel.send(`${targetUser} takipten çıkarıldı.`);
      } catch (error) {
        console.error(error);
        return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
      }
    }
  }
};
