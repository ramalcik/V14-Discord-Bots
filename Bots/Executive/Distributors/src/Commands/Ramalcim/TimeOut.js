const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require("discord.js");

module.exports = {
    conf: {
        aliases: ["timeout","time"],
        name: "timeout",
        help: "timeout <papaz/ID>",
        category: "owner",
        owner: true,
    },

    run: async (client, message, args, embed, prefix) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("5m")
                    .setLabel("5 Dakika")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("10m")
                    .setLabel("10 Dakika")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("1h")
                    .setLabel("1 Saat")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("1g")
                    .setLabel("1 Gün")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("1hafta")
                    .setLabel("1 Hafta")
                    .setStyle(ButtonStyle.Secondary)
            );


            const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("atildi")
                    .setLabel("Timeout Atıldı")
                    .setEmoji("975535509050888252")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),

            );

        const ramalcim = new EmbedBuilder()
            .setDescription(`${member} Zaman aşımına göndermek istiyorsan aşağıdaki butonlara göz at.`);

        let msg = await message.channel.send({ embeds: [ramalcim], components: [row] });

        var filter = button => button.user.id === message.member.id;

        let collector = await msg.createMessageComponentCollector({ filter, time: 30000 });

        collector.on("collect", async (button) => {
            await button.deferUpdate();

            let embeds;

            if(button.customId === "5m") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kişisinin **5 Dakikalık** zaman aşımına yolladı.`);
                member.timeout(5 * 60 * 1000);
            } else if(button.customId === "10m") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kişisinin **10 Dakikalık** zaman aşımına yolladı.`);
                member.timeout(10 * 60 * 1000);
            } else if(button.customId === "1h") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kişisinin **1 Saatlik** zaman aşımına yolladı.`);
                member.timeout(60 * 60 * 1000);
            } else if(button.customId === "1g") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kişisinin **1 Günlük** zaman aşımına yolladı.`);
                member.timeout(24 * 60 * 60 * 1000);
            } else if(button.customId === "1hafta") {
                embeds = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTimestamp()
                    .setDescription(`${message.author}, ${member} kişisinin **1 Haftalık** zaman aşımına yolladı.`);
                member.timeout(7 * 24 * 60 * 60 * 1000);
            }

            msg.edit({
                embeds: [embeds],
                components : [row1]
            });
        });
    }
};
