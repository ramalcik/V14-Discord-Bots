const { PermissionsBitField, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ayar = require("../../../../src/configs/sunucuayar.json")
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green } = require("../../../../src/configs/emojis.json")
const moment = require("moment")
moment.locale("tr")
const emojis = require("../../../../../../emojiName.json")
module.exports = {
  conf: {
    aliases: ["kayıtsız","ks","kayitsiz","unregister","unreg"],
    name: "kayitsiz",
    help: "kayitsiz  <papaz/ID>",
    category: "kayıt",
  },
  
  run: async (client, message, args, embed, prefix) => { 
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 

    {
      message.react(message.guild.emojiGöster(emojis.red))
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Yeterli yetkin yok!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
      message.react(message.guild.emojiGöster(emojis.red))
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
      message.react(message.guild.emojiGöster(emojis.red))
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Kendinle aynı yetkide ya da daha yetkili olan birini kayıtsıza atamazsınin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
      message.react(message.guild.emojiGöster(emojis.red))
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üyeyi kayıtsıza atamıyorum!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    message.react(message.guild.emojiGöster(emojis.green))
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

 const logEmbed = new EmbedBuilder()
    .setAuthor({ name: uye.user.tag, iconURL: uye.displayAvatarURL({ dynamic: true }) })
    .setDescription(`${uye} kullanıcısı ${message.member} tarafından \`kayıtsız\` atıldı
    
    > Kayıtsız Atılan Üye ${uye.toString()} Kayıtsız Atan Yetkili ${message.member.toString()} Atılma zamanı <t:${Math.floor(Date.now() / 1000)}:R>`)
  if (client.channels.cache.find(c => c.name === "indifferent_log")) client.channels.cache.find(c => c.name === "indifferent_log").send({ embeds: [logEmbed] })


    member.roles.set(conf.unregRoles);
    member.setNickname(`${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} İsim | Yaş`)
    message.react(green)
    let papaz = new EmbedBuilder()
.setDescription(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı! ${green}`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
message.reply({ embeds: [papaz] })
   
  


  },
};