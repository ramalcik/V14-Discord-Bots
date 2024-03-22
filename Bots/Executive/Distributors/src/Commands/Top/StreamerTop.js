const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder,ButtonStyle } = require("discord.js");
const StreamerStat = require("../../../../src/schemas/StreamerStat")
const moment = require('moment');
require("moment-duration-format")
moment.duration("hh:mm:ss").format()

const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["ststat","sttop"],
    name: "streamerstat",
    help: "streamerstat (top [user])",
    category: "stat",
  },

  run: async (client, message, args, embed, prefix) => { 
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    const topStreamData =  await StreamerStat.find({guildID: message.guild.id});
      const topStream = topStreamData.filter(x => message.client.users.cache.get(x.userID)).sort((a, b) => b.TotalStat - a.TotalStat).slice(0, 20);

      const topStreamData2 =  await StreamerStat.find({guildID: message.guild.id});
      const topStream2 = topStreamData2.filter(x => message.client.users.cache.get(x.userID)).sort((a, b) => b.WeeklyStat - a.WeeklyStat).slice(0, 20);
 
      let streamerUsers = topStream.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 20).map((x, index) => `${x.userID === message.author.id ? `${client.sayıEmoji(index+1)} <@${x.userID}>: \`${moment.duration(x.TotalStat).format("H [saat], m [dakika]")}\` **(Siz)**` : ` ${client.sayıEmoji(index+1)}  <@${x.userID}>: \`${moment.duration(x.TotalStat).format("D [gün], H [saat], m [dakika]")}\``}`).join("\n"); 
      let streamerUsers2 = topStream2.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 20).map((x, index) => `${x.userID === message.author.id ? `${client.sayıEmoji(index+1)} <@${x.userID}>: \`${moment.duration(x.WeeklyStat).format("H [saat], m [dakika]")}\` **(Siz)**` : ` ${client.sayıEmoji(index+1)}  <@${x.userID}>: \`${moment.duration(x.WeeklyStat).format("D [gün], H [saat], m [dakika]")}\``}`).join("\n"); 

      const yayin = `**Genel Yayın Sıralaması**\n${streamerUsers.length > 0 ? streamerUsers : "Veri Bulunmuyor."}`; 
      const yayin2 = `**Haftalık Yayın Sıralaması**\n${streamerUsers2.length > 0 ? streamerUsers2 : "Veri Bulunmuyor."}`; 

      const ramalcikk = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setDescription(`
      Aşağı da **${message.guild.name}** sunucusunda en iyi ve haftalık yayın yapan sıralaması bulunmaktadır.

      ${yayin}

      ${yayin2}`)

      message.reply({embeds: [ramalcikk]})
     },

  };