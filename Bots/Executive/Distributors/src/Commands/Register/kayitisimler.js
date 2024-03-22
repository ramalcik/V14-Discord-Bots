const { PermissionsBitField, ButtonStyle, EmbedBuilder, Discord, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const nameData = require("../../../../src/schemas/names")
const conf = require("../../../../src/configs/sunucuayar.json")
const {red, green } = require("../../../../src/configs/emojis.json")
const moment = require("moment")
moment.locale("tr")
module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    help: "isimler <papaz/ID>",
    category: "kayıt",
  },
  run: async (client, message, args, prefix) => { 

    const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder().setCustomId("önce").setLabel("Önceki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏮️"),
new ButtonBuilder().setCustomId("kapat").setLabel("Sayfaları Kapat").setStyle(ButtonStyle.Danger).setEmoji("❌"),
new ButtonBuilder().setCustomId("sonra").setLabel("Sonraki Sayfa").setStyle(ButtonStyle.Success).setEmoji("⏭️"),
);
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Yeterli yetkin yok!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });
    if (!data) return message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} ${member} kişisinin geçmiş isim bilgisi veritabanında bulunmadı.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    let page = 1;
    let liste = data ? data.names.map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""} ${x.yetkili ? `(<@${x.yetkili}>)` : ""} <t:${Math.floor(x.date / 1000)}:R>`) : "Bu kullanıcıya ait isim geçmişi bulunmuyor!"
    if (liste.length <= 10) {
    await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setTimestamp().setAuthor({ name: `${member.user.username} üyesinin isim bilgileri;`})]});
    } else if (liste.length > 10) {
    var msg = await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setTimestamp().setAuthor({ name: `${member.user.username} üyesinin isim bilgileri;`})], components: [row]});
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
                let isimlerVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder() .setDescription(`${isimlerVeri}`).setTimestamp().setAuthor({ name: `${member.user.username} üyesinin isim bilgileri;` })]});
            }
    
   if(button.customId === "sonra") {
    await button.deferUpdate();

                if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                page -= 1;
                let isimlerVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                msg.edit({ embeds: [new EmbedBuilder() .setDescription(`${isimlerVeri}`).setTimestamp().setAuthor({ name: `${member.user.username} üyesinin isim bilgileri;` })]});
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
  }
};
