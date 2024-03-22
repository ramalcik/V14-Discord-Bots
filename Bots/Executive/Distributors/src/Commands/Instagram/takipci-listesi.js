const Takipci = require('../../../../src/schemas/takipci'); // Schema dosyanızın yolunu düzgün şekilde belirtmelisiniz.
const { EmbedBuilder } = require('discord.js');

module.exports = {
    conf: {
        aliases: ["takipçilerim"],
        name: "takipcilerim",
        help: "Sizi takip eden kişilerin listesini gösterir.",
        category: "kullanıcı",
    },

    run: async (client, message, args, embed) => {
        try {
            const userID = message.author.id;

            // Takipçileri çekme
            const takipci = await Takipci.findOne({ userID });
            const takipciler = takipci ? takipci.takipciler : [];

            // Takipçilerin listesini oluşturma
            let takipciListesi = '';
            if (takipciler.length > 0) {
                takipciListesi = takipciler.map((userId, index) => {
                    const user = client.users.cache.get(userId);
                    return `\` ${index + 1} \` <@${user.id}>`;
                }).join('\n');
            } else {
                takipciListesi = 'Sizi henüz kimse takip etmiyor.';
            }

            // Embed oluşturma
            const embeds = new EmbedBuilder()
                .setTitle('Takipçilerim')
                .setDescription(`
                Aşağıda Takipçi Listen Sıralanmakta.
                
                ${takipciListesi}`);

            message.channel.send({ embeds: [embeds] });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
        }
    }
};
