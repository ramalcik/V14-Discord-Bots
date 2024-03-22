const moment = require("moment");
const cezapuans = require("../../../../src/schemas/cezapuan");
const ceza = require("../../../../src/schemas/ceza")
const name = require("../../../../src/schemas/names");
const penals = require("../../../../src/schemas/penals");
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const {green, red} = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ButtonStyle, TeamMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const db = require("../../../../src/schemas/inviter");
const regstats = require("../../../../src/schemas/registerStats");
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["sf","sıfırla"],
    name: "sıfırla",
    help: "sıfırla <@papaz/ID>",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
  

if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
{
message.reply({ embeds: [new EmbedBuilder()
  .setThumbnail()
  .setDescription(`Bu işlemi yapamazsın dostum`)
  ] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     
    var İsim = new ButtonBuilder()
    .setLabel("İsim Sıfırla")
    .setCustomId("isim_sıfırla")
    .setStyle(ButtonStyle.Secondary)

    var CezaPUan = new ButtonBuilder()
    .setLabel("Ceza Puan Sıfırla")
    .setCustomId("cezapuan_sıfırla")
    .setStyle(ButtonStyle.Primary)

    var Sicil = new ButtonBuilder()
    .setLabel("Sicil Sıfırla")
    .setCustomId("sicil_sıfırla")
    .setStyle(ButtonStyle.Success)

    var Stat = new ButtonBuilder()
    .setLabel("Stat Sıfırla")
    .setCustomId("stat_sıfırla")
    .setStyle(ButtonStyle.Danger)

    var Iptal = new ButtonBuilder()
    .setLabel("İptal")
    .setCustomId("iptal_button")
    .setStyle(ButtonStyle.Secondary)

    const row = new ActionRowBuilder()
    .addComponents([İsim, CezaPUan, Sicil, Stat, Iptal])


embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
embed.addFields({ name:`VERİ SIFIRLAMA PANELİ`,value:`
İsim Sıfırlama
Ceza Puan Sıfırlama
Sicil Sıfırlama
Stat Sıfırlama

${member.toString()} üyesine ait sıfırlamak istediğin veriyi aşağıdaki butonlar yardımıyla sıfırlayabilirsiniz.
`})

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "isim_sıfırla") {
        await button.deferUpdate();
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new EmbedBuilder()
      .setDescription(`${green} ${member.toString()} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)

msg.edit({
  embeds : [isim],
  components : []
})
      
      }

  if(button.customId === "cezapuan_sıfırla") {
    await button.deferUpdate();
    await cezapuans.deleteMany({userID: member.user.id, guildID: message.guild.id})
    await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const cezapuan = new EmbedBuilder()
    .setDescription(`${green}  ${member.toString()} üyesinin ceza puanı ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 


msg.edit({
  embeds: [cezapuan],
  components : []
})  
    }
 if(button.customId === "sicil_sıfırla") {   
    await button.deferUpdate();
    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new EmbedBuilder()
    .setDescription(`${green}  ${member.toString()} üyesinin sicili ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embeds: [sicil],
  components : []
})  
    }

    if(button.customId === "stat_sıfırla") {   
      await button.deferUpdate();

      await messageUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await voiceUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await db.deleteMany({userID: member.user.id, guildID: message.guild.id})
      await regstats.deleteMany({userID: member.user.id, guildID: message.guild.id})

      const stat = new EmbedBuilder()
      .setDescription(`${green}  ${member.toString()} üyesinin stat verileri ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 
  
  msg.edit({
    embeds: [stat],
    components : []
  })  
      }

 if(button.customId === "iptal_button") {   
    await button.deferUpdate();
    const iptal = new EmbedBuilder()
    .setDescription(`${green} Sıfırlama işlemi iptal edildi`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
