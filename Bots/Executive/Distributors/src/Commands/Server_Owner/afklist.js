const { EmbedBuilder } = require('discord.js');
const AfkModel = require('../../../../src/schemas/afk');

module.exports = {
    conf: {
        aliases: ["afkliste"],
        name: "afklist",
        help: "Afk olan kullanıcıların listesini gösterir.",
        category: "sahip",
        owner: true,
    },
    run: async (client, message, args, embed, prefix) => {
        const afkUsers = await AfkModel.find({ guildID: message.guild.id });

        if (!afkUsers || afkUsers.length === 0) {
            return message.channel.send("Şu anda hiçbir kullanıcı afk değil.");
        }

        const afkListEmbed = new EmbedBuilder()
        afkUsers.forEach((user, index) => {
            afkListEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ramal_nokta")} \`${message.guild.name}\` **Adlı Sunucumuzda [AFK] Olan Kullanıcıların Hepsini Aşağıda Listeler.**
            
            \` ${index + 1} \` ${client.users.cache.get(user.userID)} - **Sebep:** \` ${user.reason} \``);
        });

        await message.channel.send({ embeds: [afkListEmbed] });
    },
};
