const Bakiye = require('../../../../src/schemas/dinar');

module.exports = {
    conf: {
      aliases: ["aktar", "dinar-ver", "paylas"],
      name: "aktar",
      help: "aktar",
      category: "kullanıcı",
    },
    run: async (client, message, args, embed, prefix) => {
        try {
            // Sunucunun kimliğini al
            const guildId = message.guild.id;

            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!member) return message.channel.send('Lütfen bir üye belirtin.');

            let authorBakiye = await Bakiye.findOne({ userId: message.author.id, guildId: guildId });
            if (!authorBakiye) {
                authorBakiye = await Bakiye.create({ userId: message.author.id, guildId: guildId, bakiyeMiktarı: 0 });
            }

            let amount = parseInt(args[1]);
            if (!amount || isNaN(amount) || amount <= 0) return message.channel.send('Lütfen geçerli bir miktar belirtin.');

            if (authorBakiye.bakiyeMiktarı < amount) return message.channel.send('Yeterli bakiyeniz yok.');

            let memberBakiye = await Bakiye.findOne({ userId: member.user.id, guildId: guildId });
            if (!memberBakiye) {
                memberBakiye = await Bakiye.create({ userId: member.user.id, guildId: guildId, bakiyeMiktarı: 0 });
            }

            // Gönderenin bakiyesini güncelleme
            authorBakiye.bakiyeMiktarı -= amount;
            await authorBakiye.save();

            // Alıcının bakiyesini güncelleme
            memberBakiye.bakiyeMiktarı += amount;
            await memberBakiye.save();

            return message.channel.send(`💸 **${amount}** parayı başarıyla **${member.user.tag}** hesabına aktardınız.`);
        } catch (err) {
            console.error("Hata oluştu:", err);
            return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }
};
