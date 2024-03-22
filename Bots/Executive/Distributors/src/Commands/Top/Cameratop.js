const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder,ButtonStyle } = require("discord.js");
const CameraUserChannel = require("../../../../src/schemas/cameraUserChannel")
const CameraStat = require("../../../../src/schemas/CameraStat")
const moment = require('moment');
require("moment-duration-format")
moment.duration("hh:mm:ss").format()

const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["kamerastat"],
    name: "topcamera",
    help: "topcamera (top [user])",
    category: "stat",
  },

  run: async (client, message, args, embed, prefix) => { 
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

      const topCameraData =  await CameraStat.find({guildID: message.guild.id});
      const topCamera = topCameraData.filter(x => message.client.users.cache.get(x.userID)).sort((a, b) => b.TotalStat - a.TotalStat).slice(0, 20);

      const topCameraData2 =  await CameraStat.find({guildID: message.guild.id});
      const topCamera2 = topCameraData2.filter(x => message.client.users.cache.get(x.userID)).sort((a, b) => b.WeeklyStat - a.WeeklyStat).slice(0, 20);
 
      let cameraUsers = topCamera.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 20).map((x, index) => `${x.userID === message.author.id ? `${client.sayıEmoji(index+1)} <@${x.userID}>: \`${moment.duration(x.TotalStat).format("H [saat], m [dakika]")}\` **(Siz)**` : ` ${client.sayıEmoji(index+1)}  <@${x.userID}>: \`${moment.duration(x.TotalStat).format("D [gün], H [saat], m [dakika]")}\``}`).join("\n"); 
      let cameraUsers2 = topCamera2.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 20).map((x, index) => `${x.userID === message.author.id ? `${client.sayıEmoji(index+1)} <@${x.userID}>: \`${moment.duration(x.WeeklyStat).format("H [saat], m [dakika]")}\` **(Siz)**` : ` ${client.sayıEmoji(index+1)}  <@${x.userID}>: \`${moment.duration(x.WeeklyStat).format("D [gün], H [saat], m [dakika]")}\``}`).join("\n"); 

      const kamera = `**Toplam Kamera Sıralaması**\n${cameraUsers.length > 0 ? cameraUsers : "Veri Bulunmuyor."}`; 
      const kamera2 = `**Haftalık Kamera Sıralaması**\n${cameraUsers2.length > 0 ? cameraUsers2 : "Veri Bulunmuyor."}`; 

      const ramal = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
      .setDescription(`
      Aşağı da **${message.guild.name}** sunucusunda en iyi ve haftalık kamera verisi sıralaması bulunmaktadır.

      ${kamera}

      ${kamera2}`)

      message.channel.send({embeds: [ramal]})
     },
  };
