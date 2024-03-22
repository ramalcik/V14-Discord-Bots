const moment = require("moment");
moment.locale("tr");
const ayar = require("../../../../src/configs/ayarName.json");
const { Permissions, MessageActionRow, MessageButton, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    conf: {
        aliases: ["allmute"],
        name: "allmute",
        help: "allmute",
        category: "yönetim",
    },

    run: async (client, message, args, embed) => {
        let kanallar = ayar.KomutKullanımKanalİsim;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) {
            return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
        }
        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) return;

        let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channel) {
            message.reply({ embeds: [new EmbedBuilder()
                .setDescription(`Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın`)
            ] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
            return;
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('muteAll')
                .setLabel('Herkesi Sustur')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('unmuteAll')
                .setLabel('Herkesi Aç')
                .setStyle(ButtonStyle.Success)
        );

        message.reply({ content: `Sesli kanaldaki tüm üyeleri susturmak veya açmak istediğinizden emin misiniz?`, components: [row] }).then((msg) => {
            const filter = i => (i.customId === 'muteAll' || i.customId === 'unmuteAll') && i.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 10000 });

            collector.on('collect', async (i) => {
                i.deferUpdate();
                if (i.customId === 'muteAll') {
                    channel.members.filter((x) => !x.permissions.has(PermissionsBitField.Flags.Administrator))
                        .forEach((x, index) => {
                            client.wait(index * 1000);
                            x.voice.setMute(true);
                        });
                    await message.reply({ embeds: [new EmbedBuilder()
                        .setDescription(`🔇 \`${channel.name}\` kanalındaki tüm üyeler susturuldu!`)
                    ] });
                } else if (i.customId === 'unmuteAll') {
                    channel.members.filter((x) => !x.permissions.has(PermissionsBitField.Flags.Administrator))
                        .forEach((x, index) => {
                            client.wait(index * 1000);
                            x.voice.setMute(false);
                        });
                    await message.reply({ embeds: [new EmbedBuilder()
                        .setDescription(`🔊 \`${channel.name}\` kanalındaki tüm üyelerin susturulması kaldırıldı!`)
                    ] });
                }
            });
        });
    },
};
