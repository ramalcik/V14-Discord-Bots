const Takip = require('../../../../src/schemas/takip'); // Schema dosyanızın yolunu düzgün şekilde belirtmelisiniz.
const { EmbedBuilder } = require('discord.js');

module.exports = {
    conf: {
        aliases: ["takiplistesi"],
        name: "takiplistesi",
        help: "Takip ettiğiniz kişilerin listesini gösterir.",
        category: "kullanıcı",
    },

    run: async (client, message, args, embed) => {
        try {
            const userID = message.author.id;

            // Takip edilen kişileri çekme
            const takip = await Takip.findOne({ userID });
            const takipEdilenler = takip ? takip.takipEdilenler : [];

            // Takip edilen kişilerin listesini oluşturma
            let takipListesi = '';
            if (takipEdilenler.length > 0) {
                takipListesi = takipEdilenler.map((userId, index) => {
                    const user = client.users.cache.get(userId);
                    return `\` ${index + 1} \` <@${user.id}>`;
                }).join('\n');
            } else {
                takipListesi = 'Henüz kimseyi takip etmiyorsunuz.';
            }

            // Embed oluşturma
            const embed = new EmbedBuilder()
                .setTitle('Takip Listesi')
                .setDescription(`
                Aşağıda Senin Takip Ettiğin Kişiler Listelenmektedir.
                
                ${takipListesi}`);

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
        }
    }
};
