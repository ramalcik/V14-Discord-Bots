const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const cezapuan = require("../../../../src/schemas/cezapuan")
const ceza = require("../../../../src/schemas/ceza")
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green } = require("../../../../src/configs/emojis.json");
const messageUserChannel = require("../../../../src/schemas/messageUserChannel");
const ayar = require("../../../../src/configs/ayarName.json");
const emojis = require("../../../../../../emojiName.json")
module.exports = {
  conf: {
    aliases: ["cezapuan","cp","ceza"],
    name: "cezapuan",
    help: "cezapuan <papaz/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(message.guild.emojiGöster(emojis.red))
return 
}

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) { message.reply({ embeds: [new EmbedBuilder()
 // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
  .setThumbnail()
  .setDescription(`${client.emojis.cache.find(x => x.name === "red")} Böyle bir kullanıcı bulunamadı`)
  ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(message.guild.emojiGöster(emojis.red))
return 
}
const cezaData = await ceza.findOne({ guildID: allah.GuildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ userID: member.user.id });
message.react(message.guild.emojiGöster(emojis.green))
message.reply({ embeds: [new EmbedBuilder()
 // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
  .setThumbnail()
  .setDescription(`${client.emojis.cache.find(x => x.name === "green")} ${member} kişisinin toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0}\` ceza puanı ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte!`)
  ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
},
};

