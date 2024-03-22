const Takipci = require('../../../../src/schemas/takipci'); // Schema dosyanızın yolunu düzgün şekilde belirtmelisiniz.
const { EmbedBuilder } = require('discord.js');

module.exports = {
    conf: {
        aliases: ["takipci-top"],
        name: "takipcitop",
        help: "En fazla takipçisi olan kişiyi gösterir.",
        category: "kullanıcı",
    },

    run: async (client, message, args, embed) => {
        try {
            // Tüm kullanıcıların takipçi sayılarını çekme
            const allTakipciler = await Takipci.find({});
            const takipciCounts = allTakipciler.map(data => {
                return { userID: data.userID, count: data.takipciler.length };
            });

            // Sıralamayı takipçi sayısına göre yapma
            const sortedTakipciler = takipciCounts.sort((a, b) => b.count - a.count);

            // İlk 10 kullanıcıyı alıp liste oluşturma
            const top10 = sortedTakipciler.slice(0, 10);
            let list = '';
            for (let i = 0; i < top10.length; i++) {
                const user = await client.users.fetch(top10[i].userID);
                list += `\` ${i + 1} \`  <@${user.id}> **${top10[i].count} takipçi**\n`;
            }

            // Embed oluşturma
const embeds = new EmbedBuilder()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun bu haftanın takipçi sıralaması listelenmektedir.

${list || "Veri Bulunmuyor."}

Bu haftanın takipçi sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`);

            message.channel.send({ embeds: [embeds] });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
        }
    }
};
