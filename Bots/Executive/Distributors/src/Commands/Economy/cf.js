const { EmbedBuilder } = require("discord.js");
const Bakiye = require('../../../../src/schemas/dinar'); // Bakiye modelini içeri aktar

module.exports = {
    conf: {
        aliases: ["cf", "yazıtura", "yazı-tura"],
        name: "coinflip",
        help: "coinflip",
        category: "kullanıcı"
    },
    run: async (client, message, args, embed, prefix) => {
        try {
            const userId = message.author.id;
            let userData = await Bakiye.findOne({ userId: userId });

            // Banka hesabı yoksa varsayılan bakiye oluştur
            if (!userData) {
                userData = await Bakiye.create({ userId: userId, bakiyeMiktarı: 0 });
            }

            const option = args[0] ? args[0].toLowerCase() : '';

            if (option !== 'yazı' && option !== 'tura') {
                return message.reply("Geçerli bir seçenek belirtmelisiniz (yazı veya tura).");
            }

            const amount = parseInt(args[1]) || 1;
            if (isNaN(amount) || amount <= 0) {
                return message.reply("Geçerli bir para miktarı belirtmelisiniz.");
            }

            // Kullanıcının cüzdanındaki para miktarını kontrol etme
            if (amount > userData.bakiyeMiktarı) {
                return message.reply("Paranız yeterli değil.");
            }

            const options = ['yazı', 'tura'];
            const result = options[Math.floor(Math.random() * options.length)];

            if (result === option) {
                await Bakiye.findOneAndUpdate({ userId: userId }, { $inc: { bakiyeMiktarı: amount } });
                return message.reply(`Kazandınız. Seçtiğiniz: **${result}**. Kazanılan Para: $${amount}`);
            } else {
                await Bakiye.findOneAndUpdate({ userId: userId }, { $inc: { bakiyeMiktarı: -amount } });
                return message.reply(`Kaybettiniz. Gelen: **${result}**. Kaybedilen Para: $${amount}`);
            }
        } catch (error) {
            console.error("Hata oluştu:", error);
            return message.reply("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }
};
