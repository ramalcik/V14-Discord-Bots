const Bakiye = require('../../../../src/schemas/dinar');

module.exports = {
    conf: {
      aliases: ["madenara","ara"],
      name: "madenara",
      help: "madenara",
      category: "kullanıcı",
    },
  
    
run: async (client, message, args, embed, prefix) => {
    try {
        // Sunucunun kimliğini al
        const guildId = message.guild.id;

        let users = [
            "Levian",
            "Elmas",
            "Altın",
            "Gümüş"
        ];
        let amount = Math.floor(Math.random() * 200) + 50;

        // Kullanıcının bakiye bilgilerini MongoDB'den çekme
        let bakiye = await Bakiye.findOne({ userId: message.author.id, guildId: guildId });
        if (!bakiye) {
            // Eğer kullanıcı bakiye bilgisine sahip değilse, varsayılan olarak 0 bakiye varsayalım
            bakiye = await Bakiye.create({ userId: message.author.id, guildId: guildId, bakiyeMiktarı: 0 });
        }

        // Dilenme işlemini gerçekleştirme ve sonrasında bakiye miktarını almak
        const beg = {
            amount: amount,
            onCooldown: false,
            lost: Math.random() < 0.5 // %50 şansla kaybetme
        };

        if (beg.onCooldown) return message.reply(`${beg.time.minutes} dakika ve ${beg.time.seconds} saniye sonra tekrar gelin.`);
        if (beg.lost) return message.channel.send(`**${users[Math.floor(Math.random() * users.length)]}:** Yakalandınız! Parayı alamadın ufaklık.`);
        
        // Bakiyeyi güncelleme
        bakiye.bakiyeMiktarı += beg.amount;
        await bakiye.save();

        return message.reply(`**${users[Math.floor(Math.random() * users.length)]}** biraz kârlıydı, **${beg.amount}** 💸 buldunuz. Artık **${bakiye.bakiyeMiktarı}** 💸 var.`);
    } catch (err) {
        console.error("Hata oluştu:", err);
        return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    }
}
}