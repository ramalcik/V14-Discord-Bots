const Discord = require("discord.js");
const bannedCmd = require("../../../../src/schemas/bannedCmd");
const settings = require("../../../../../../config.json");
const emojis = require('../../../../src/configs/emojis.json')
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const { PermissionsBitField } = require("discord.js")
module.exports = {
  conf: {
    aliases: ['cmd'],
    name: "cmd",
    help: "cmd yasakla @papaz/ID",
    owner: true,
    category: "owner"
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
 
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ content: "Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {
  }

if(args[0] == "yasakla" || args[0] == "banned") {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
if(!member) return message.reply({embeds: [embed.setDescription(`Bir Kullanıcı Belirt.`)]}).sil(15)  
var veri = await bannedCmd.findOne({
      guildID: message.guild.id
    }) || {
      "kullanici": []
    };                                             
if (veri.kullanici.includes(member.id)) {
          await bannedCmd.updateOne({ guildID: message.guild.id }, { $pull: { kullanici: member.id } }, { upsert: true });

message.reply({embeds: [embed.setDescription(`Başarıyla ${member} kullanıcısının yasağı kaldırıldı.`)]})  
        } else {
          await bannedCmd.updateOne({ guildID: message.guild.id }, { $push: { kullanici: member.id } }, { upsert: true });

message.reply({embeds: [embed.setDescription(`Başarıyla ${member} kullanıcısı yasaklıya eklendi.`)]})  
        } }  
  }
}