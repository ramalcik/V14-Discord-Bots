const { PermissionsBitField, ButtonStyle, EmbedBuilder, Discord, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { red, green } = require("../../../../src/configs/emojis.json")
const roller = require("../../../../src/schemas/rolveridb");
const conf = require("../../../../src/configs/sunucuayar.json")
const emoji = require("../../../../src/configs/emojis.json");
const moment = require("moment");
moment.locale("tr");
const ayar = require("../../../../src/configs/ayarName.json");
const emojis = require("../../../../../../emojiName.json")
module.exports = {
  conf: {
aliases: ["rollog"],
name: "rollog",
help: "rollog",
category: "yetkili",
},

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      message.react(message.guild.emojiGöster(emojis.red))
      message.reply({ embeds: [new EmbedBuilder()
        .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail()
        .setDescription(`${red} Yeterli yetkin bulunmuyor`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
      return };
      
const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setCustomId("önce")
.setLabel("Önceki Sayfa")
.setStyle(ButtonStyle.Success)
.setEmoji("⏮️"),

new ButtonBuilder()
.setCustomId("kapat")
.setLabel("Sayfaları Kapat")
.setStyle(ButtonStyle.Danger)
.setEmoji("❌"),

new ButtonBuilder()
.setCustomId("sonra")
.setLabel("Sonraki Sayfa")
.setStyle(ButtonStyle.Success)
.setEmoji("⏭️"),

);

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const Veri = await roller.findOne({ user: Member.id });
        if (!Veri) return message.reply({ content: "<@" + Member.id + "> kişisinin rol bilgisi veritabanında bulunmadı."})
        let page = 1;
        let rol = Veri.roller.sort((a, b) => b.tarih - a.tarih)
        let liste = rol.map(x => `\`[${x.tarih}\`, **[${x.state == "Ekleme" ? "EKLEME" : "KALDIRMA" }]**] <@${x.mod}>: <@&${x.rol}>`)
        if (liste.length <= 10) {
        await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})]});
        } else if (liste.length > 10) {
        var msg = await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})], components: [row]});
        }
 
        if (msg) {
        var filter = (button) => button.user.id === message.author.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })
       
        collector.on("collect", async (button) => {
              
        if (liste.length > 10) {

       if(button.customId === "önce") {
        await button.deferUpdate();

                    if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                    page += 1;
                    let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                    msg.edit({ embeds: [new EmbedBuilder() .setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})]});
                }
        
       if(button.customId === "sonra") {
        await button.deferUpdate();

                    if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                    page -= 1;
                    let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                    msg.edit({ embeds: [new EmbedBuilder() .setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})]});
                }
       
       if(button.customId === "kapat") {
        await button.deferUpdate();

        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] }); 
                }
            }
          })
        }
  },
};