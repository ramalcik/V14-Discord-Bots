const { EmbedBuilder } = require('discord.js');
const Bakiye = require('../../../../src/schemas/dinar'); // Counter modelini içeri aktar

module.exports = {
    conf: {
      aliases: ["çalış","calis"],
      name: "çalış",
      help: "çalış",
      category: "kullanıcı",
    },
    run: async (client, message, args, embed, prefix) => {
    try {
        // Sunucunun kimliğini al
        const guildId = message.guild.id;

        let amount = Math.floor(Math.random() * 1500) + 1000;

        // Kullanıcının bakiye bilgilerini MongoDB'den çekme
        let bakiye = await Bakiye.findOne({ userId: message.author.id, guildId: guildId });
        if (!bakiye) {
            // Eğer kullanıcı bakiye bilgisine sahip değilse, varsayılan olarak 0 bakiye varsayalım
            bakiye = await Bakiye.create({ userId: message.author.id, guildId: guildId, bakiyeMiktarı: 0 });
        }

        // Çalışma işlemini gerçekleştirme ve sonrasında bakiye miktarını almak
        const workedAs = "İş";
        const workedAmount = amount;

        // Bakiyeyi güncelleme
        bakiye.bakiyeMiktarı += workedAmount;
        await bakiye.save();

        return message.reply(`**${workedAs}** olarak çalıştınız ve **${workedAmount}** 💸 kazandınız. Artık **${bakiye.bakiyeMiktarı}** 💸 var.`);
    } catch (err) {
        console.error("Hata oluştu:", err);
        return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    }
}
}