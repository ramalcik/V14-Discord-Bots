const { EmbedBuilder } = require('discord.js');
const Bakiye = require('../../../../src/schemas/dinar');
const ms = require("ms"); // Counter modelini içeri aktar
const GUNLUK_ARALIK = 24 * 60 * 60 * 1000;
module.exports = {
    conf: {
      aliases: ["günlük","gunluk"],
      name: "günlük",
      help: "günlük",
      category: "kullanıcı",
    },
  
    
run: async (client, message, args, embed, prefix) => {
    try {
        // Günlük olarak eklenecek miktarı belirleme
        let amount = Math.floor(Math.random() * 500) + 100;

        // Kullanıcının bakiye bilgisini MongoDB'den çekme
        let bakiye = await Bakiye.findOne({ userId: message.author.id });

        if (!bakiye) {
            // Eğer kullanıcı bakiye bilgisine sahip değilse, varsayılan olarak 0 bakiye varsayalım
            bakiye = await Bakiye.create({ userId: message.author.id });
        }


        const now = Date.now();
            const lastClaimed = bakiye.lastClaimed || 0;

            // Son talep zamanını kontrol edin, eğer belirli bir süreden daha azsa, hata döndürün
            if (now - lastClaimed < GUNLUK_ARALIK) {
                const kalanSure = ms(GUNLUK_ARALIK - (now - lastClaimed), { long: true });
                return message.reply(`Günlük paranızı zaten talep ettiniz. Tekrar talep etmek için ${kalanSure} bekleyin.`);
            }

        // Günlük para eklemesini yapma ve sonrasındaki bakiye miktarını almak
        const updatedBakiye = bakiye.bakiyeMiktarı + amount;
        bakiye.bakiyeMiktarı = updatedBakiye;
        bakiye.lastClaimed = now;
        await bakiye.save();

        const embeds = new EmbedBuilder()
            .setTitle("Günlük Para")
            .setDescription(`Günlük para olarak **${amount}** 💸 eklendi ve şimdi **${updatedBakiye}** 💸 paranız var.`)
            .setTimestamp();

            await message.channel.send({ embeds: [embeds], })
    } catch (err) {
        console.error("Hata oluştu:", err);
        return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    }
}
}

