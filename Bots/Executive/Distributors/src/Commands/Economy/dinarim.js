const { EmbedBuilder } = require('discord.js');
const Bakiye = require('../../../../src/schemas/dinar'); // Counter modelini içeri aktar

module.exports = {
    conf: {
      aliases: ["dinar"],
      name: "dinar",
      help: "dinar",
      category: "kullanıcı",
    },
    run: async (client, message, args, embed, prefix) => {
        try {
            // Sunucunun kimliğini al
            const guildId = message.guild.id;

            let user = message.mentions.users.first() || message.author;

            // Kullanıcının bakiye bilgilerini MongoDB'den çekme
            let bakiye = await Bakiye.findOne({ userId: user.id, guildId: guildId });

            if (!bakiye) {
                // Eğer kullanıcı bakiye bilgisine sahip değilse, varsayılan olarak 0 bakiye varsayalım
                bakiye = await Bakiye.create({ userId: user.id, guildId: guildId });
            }

            // Bakiye geçmişini alıp, en son 5 transferi gösterelim
            const transferler = bakiye.transferEdilenMiktarlar.slice(-5);

            const embeds = new EmbedBuilder()
                .setTitle(`${user.tag}'nin Bakiye Bilgisi`)
                .addFields(
                { name: "Kullanıcı",  value: `<@${user.id}>`, inline: true },
                { name: "Bakiye",  value: `${bakiye.bakiyeMiktarı} 💸`, inline: true },
                )
                .setThumbnail(user.displayAvatarURL())
                .setTimestamp();

            await message.channel.send({ embeds: [embeds] });
        } catch (err) {
            console.error("Hata oluştu:", err);
            return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }
};
