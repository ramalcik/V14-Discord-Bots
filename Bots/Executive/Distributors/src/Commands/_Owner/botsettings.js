const Discord = require("discord.js");
const allah = require("../../../../../../config.json");
const children = require("child_process");
const bots = global.allbots;
const client = global.bot;
const { green, red,Hello } = require("../../../../src/configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["bots", "botayarlar"],
    name: "botsettings",
    help: "botsettings",
    category: "sahip",
    owner: true,
  },

run: async (client, message, args, embed) => {
    const sonbots = [];
    bots.forEach((bot) => {
        sonbots.push({
            value: bot.user.id,
            description: `${bot.user.id}`,
            label: `${bot.user.tag}`,
            emoji: { id: "1214837874084548618" },
        })
    });

    const row = new Discord.ActionRowBuilder().addComponents(
        new Discord.StringSelectMenuBuilder()
            .setCustomId("botsmenu")
            .setPlaceholder("Güncellemek İstediğiniz Botu Seçin!")
            .addOptions(sonbots)
    )
    const row2 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder().setCustomId("allres").setLabel("Tüm Botları Yeniden Başlat").setEmoji("1206592589910777857").setStyle(Discord.ButtonStyle.Danger),
    );
    const mesaj = await message.channel.send({ embeds: [embed.setDescription(`Aşağıda sıralanmakta olan botların, ismini veya profil fotoğrafını değiştirmek istiyorsanız herhangi botu seçin.`)], components: [row, row2] });
    const filter = e => e.user.id === message.author.id;
    const collector = mesaj.createMessageComponentCollector({ filter, time: 60000, errors: ["time"] });

    collector.on("collect", async (menu) => {
        if (menu.customId === "botsmenu") {
            if (!menu.values) return menu.reply({ content: "Bot veya işlem bulunamadı.", ephemeral: true });

            const botclient = allbots.find((bot) => bot.user.id === menu.values[0]);
            if (!botclient) return menu.reply({ content: "Bot veya işlem bulunamadı.", ephemeral: true });
            const newrow = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setCustomId("botupdateavatar").setLabel("Profil Fotoğrafını Değiştir").setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder().setCustomId("botupdatename").setLabel("İsmini Değiştir").setStyle(Discord.ButtonStyle.Primary),
            );
            if (mesaj) mesaj.delete().catch(() => { });
            await message.channel.send({ embeds: [embed.setDescription(`${botclient.user} isimli bot üzerinde hangi işlemi yapmak istersin?`)], components: [newrow] }).then(async (msj) => {
                const filter = e => e.user.id === message.member.id;
                const col = msj.createMessageComponentCollector({ filter, time: 60000, errors: ["time"] });

                col.on("collect", async (button) => {
                    const botclient = allbots.find((bot) => bot.user.id === menu.values[0]);
                    if (!botclient) return menu.reply({ content: "Bot veya işlem bulunamadı.", ephemeral: true });
                    if (button.customId === "botupdateavatar") {
                        if (msj) msj.edit({ embeds: [embed.setDescription(`${green} ${botclient.user} isimli botun yeni profil resmini yükleyin veya bağlantısını girin. İşleminizi \`60 saniye\` içinde tamamlamazsanız otomatik olarak iptal edilecektir. İşlemi iptal etmek için \`iptal\` yazabilirsin.`)], components: [] });
                        const avatarfilter = e => e.author.id === message.member.id;
                        const coll = msj.channel.createMessageCollector({ filter: avatarfilter, time: 60000, max: 1, errors: ["time"] });

                        coll.on("collect", async (msg) => {
                            if (["iptal", "i"].some((cevap) => msg.content === cevap)) {
                                if (msj) msj.delete().catch(() => { });
                                message.react(red);
                                await button.reply({ content: "Profil değiştirme işlemi iptal edildi.", ephemeral: true });
                                return;
                            }
                            const bekle = await message.channel.send({ content: "Profil resmi değiştirme işlemi başladı. Bu işlem uzun sürebilir, lütfen sabırla bekleyin." });
                            const avatar = msg.content || msg.attachments.first().url;
                            if (!avatar) {
                                message.react(red);
                                if (msj) msj.delete().catch(() => { });
                                button.reply({ content: "Profil resmi belirtmediğiniz için işlem iptal edildi.", ephemeral: true });
                                return;
                            }
                            botclient.user.setAvatar(avatar).then(() => {
                                if (bekle) bekle.delete().catch(() => { });
                                if (msj) msj.delete().catch(() => { });
                                message.channel.send({ embeds: [embed.setDescription(`${green} ${botclient.user} isimli botun profil resmi başarıyla güncellendi.`).setThumbnail(botclient.user.avatarURL())] }).then((s) => message.react(green) && setTimeout(() => { if (s) s.delete(); }, 20000));
                                const log = client.channels.cache.find(x => x.name == "bot_log")
                                if (log) log.send({ embeds: [embed.setDescription(`${botclient.user} isimli botun profil resmi ${message.member.toString()} tarafından <t:${Math.floor(Date.now() / 1000)}> tarihinde değiştirildi.`).setThumbnail(botclient.user.avatarURL())] });
                            }).catch(() => {
                                if (bekle) bekle.delete().catch(() => { });
                                if (msj) msj.delete().catch(() => { });
                                message.channel.send({ embeds: [embed.setDescription(`${red} Profil resmi güncellenemedi, çünkü biraz beklemem gerekiyor.`)] }).then((s) => message.react(red) && setTimeout(() => { if (s) s.delete(); }, 10000));
                            });
                        });

                        coll.on("end", () => {
                            if (msj) msj.delete().catch(() => { });
                        });
                    } else if (button.customId === "botupdatename") {
                        if (msj) msj.edit({ embeds: [embed.setDescription(`${green} ${botclient.user} isimli botun yeni ismini girin. İşleminizi \`60 saniye\` içinde tamamlamazsanız otomatik olarak iptal edilecektir. İşlemi iptal etmek için \`iptal\` yazabilirsin.`)], components: [] });
                        const isimfilter = e => e.author.id === message.member.id;
                        const coll = msj.channel.createMessageCollector({ filter: isimfilter, time: 60000, max: 1, errors: ["time"] });

                        coll.on("collect", async (msg) => {
                            if (["iptal", "i"].some((cevap) => msg.content === cevap)) {
                                if (msg) msg.delete().catch(() => { });
                                message.react(red);
                                await button.reply({ content: "Profil değiştirme işlemi iptal edildi.", ephemeral: true });
                                return;
                            }
                            const eskinick = botclient.user.username;
                            const bekle = await message.channel.send({ content: "İsim değiştirme işlemi başladı. Bu işlem uzun sürebilir, lütfen sabırla bekleyin." });
                            const isim = msg.content;
                            if (!isim) {
                                message.react(red);
                                if (msj) msj.delete().catch(() => { });
                                button.reply({ content: "İsim belirtmediğiniz için işlem iptal edildi.", ephemeral: true });
                                return;
                            }
                            botclient.user.setUsername(isim).then(() => {
                                if (bekle) bekle.delete().catch(() => { });
                                if (msj) msj.delete().catch(() => { });
                                message.channel.send({ embeds: [embed.setDescription(`${green} ${botclient.user} isimli botun ismi başarıyla güncellendi.`).addFields({ name: "İsim", value: `\`${eskinick}\` --> \`${botclient.user.username}\``, inline: false })] }).then((s) => message.react(green) && setTimeout(() => { if(s) s.delete(); }, 20000));
                                const log = client.channels.cache.find(x => x.name == "bot_log")
                                if (log) log.send({ embeds: [embed.setDescription(`${botclient.user} isimli botun ismi ${message.member.toString()} tarafından <t:${Math.floor(Date.now() / 1000)}> tarihinde değiştirildi.`)] });
                            }).catch(() => {
                                if (bekle) bekle.delete().catch(() => { });
                                if (msj) msj.delete().catch(() => { });
                                message.channel.send({ embeds: [embed.setDescription(`${red} İsim güncellenemedi, çünkü biraz beklemem gerekiyor.`)] }).then((s) => message.react(red) && setTimeout(() => { if (s) s.delete(); }, 10000));
                            });
                        });

                        coll.on("end", () => {
                            if (msj) msj.delete().catch(() => { });
                        });
                    }
                });
            });
        } 
        if (menu.customId == "allres") {
            menu.deferUpdate(true);
            if (mesaj) mesaj.delete().catch(() => { });
            if(allah.Welcome.Active) {
                children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
            }
            children.exec(`pm2 restart ${allah.GuildName}_Voucher ${allah.GuildName}_Statistics ${allah.GuildName}_Guard_I ${allah.GuildName}_Guard_II ${allah.GuildName}_Guard_III ${allah.GuildName}_Moderation`);
        }
    });

    collector.on("end", async () => {
        if (mesaj) mesaj.delete().catch(() => { });
    });
  },
};