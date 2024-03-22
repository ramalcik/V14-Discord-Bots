const { EmbedBuilder } = require("discord.js");
const Bakiye = require('../../../../src/schemas/dinar'); // Bakiye modelini içeri aktar

module.exports = {
    conf: {
      aliases: ["siralama"],
      name: "siralama",
      help: "siralama",
      category: "kullanıcı",
    },
    
    run: async (client, message, args, embed, prefix) => {
        // Bakiye verilerini MongoDB'den çekme ve sıralama
        let leaderboard = await Bakiye.find({ guildId: message.guild.id }).sort({ bakiyeMiktarı: -1 }).limit(20);

        // Liderlik tablosu oluşturma
        let list = leaderboard.map((user, index) => {
            const member = message.guild.members.cache.get(user.userId);
            const userName = member ? member.id : "Bilinmeyen Kullanıcı";
            return `\` ${index + 1} \`  <@${userName}> \`${user.bakiyeMiktarı}\`💸`;
        }).join("\n");

        const embeds = new EmbedBuilder()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun bu haftanın Dinar sıralaması listelenmektedir.
      
${list || "Veri Bulunmuyor."}
      
Bu haftanın Dinar sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`);

        await message.channel.send({ embeds: [embeds] });
    }
};
