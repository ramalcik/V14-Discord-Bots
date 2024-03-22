// commands/profildurum.js
const Durum = require('../../../../src/schemas/Durum'); // Schema dosyanızın yolunu düzgün şekilde belirtmelisiniz.
const { EmbedBuilder } = require('discord.js');

module.exports = {
    conf: {
        aliases: ["profil-durum","durum"],
        name: "profildurum",
        help: "Profilinizdeki durumu gösterir.",
        category: "kullanıcı",
    },

    run: async (client, message, args, embed) => {
        try {
            const user = message.author;

            // Durumu güncelleme
            const newStatus = args.join(" ");
            if (newStatus) {
                await Durum.findOneAndUpdate({ userID: user.id }, { $set: { durum: newStatus } }, { upsert: true });
                return message.channel.send("Durum mesajı başarıyla güncellendi.");
            }

            // Durumu gösterme
            const durumData = await Durum.findOne({ userID: user.id });
            const durumMesaji = durumData ? durumData.durum : "Durum mesajı bulunmuyor.";

            // Embed oluşturma
            const embeds = new EmbedBuilder()
                .setDescription(`
                Aşağıda Yazdığınız Durumu Görüntüleyebilirsiniz.

                ||${durumMesaji}||`);

            message.channel.send({ embeds: [embeds] });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
        }
    }
};
