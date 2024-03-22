const { EmbedBuilder } = require('discord.js');
const Bakiye = require('../../../../src/schemas/dinar'); // Counter modelini içeri aktar

module.exports = {
    conf: {
      aliases: ["dilen"],
      name: "dilen",
      help: "dilen",
      category: "kullanıcı",
    },
    run: async (client, message, args, embed, prefix) => {
        try {
            // Sunucunun kimliğini al
            const guildId = message.guild.id;
    
            let users = [
                "Enes Batur",
                "Orkun Işıtmak",
                "Kafalar",
                "Elraenn"
            ];
    
            let amount = Math.floor(Math.random() * 50) + 10;
    
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
    
            if (beg.onCooldown) return message.reply(`Defol git! ${beg.time.seconds} saniye sonra geri gel`);
            if (beg.lost) return message.channel.send(`**${users[Math.floor(Math.random() * users.length)]}:** Defol git! Kendine İş Bul`);
            
            // Bakiyeyi güncelleme
            bakiye.bakiyeMiktarı += beg.amount;
            await bakiye.save();
    
            return message.reply(`**${users[Math.floor(Math.random() * users.length)]}** size **${beg.amount}** TL verdi  💸. Artık **${bakiye.bakiyeMiktarı}** TL var.`);
        } catch (err) {
            console.error("Hata oluştu:", err);
            return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
}
}
