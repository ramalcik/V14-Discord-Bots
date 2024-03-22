const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const penals = require("../../../../src/schemas/penals");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["unjail"],
    name: "unjail",
    help: "unjail <papaz/ID>",
    category: "cezalandırma",
  },

  run: async (client, message,  args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
     // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Yeterli yetkin bulunmuyor!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!conf.jailRole.some(x => member.roles.cache.has(x)) && !conf.doomRole.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üye jailde değil!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
     // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Kendinle aynı yetkide ya da daha yetkili olan birinin jailini kaldıramazsın!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) {
    message.react(red)  
    message.reply({ embeds: [new EmbedBuilder()
     // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üyeyi jailden çıkaramıyorum!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "JAIL" }, { type: "TEMP-JAIL" }, { type: "Doom" }], active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.react(green)
    message.reply({ content:`${green} ${member.toString()} üyesinin jaili ${message.author} tarafından kaldırıldı!`}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, jailiniz kaldırıldı!`}).catch(() => {});

          const log = new EmbedBuilder()
          .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **${message.author.tag}** tarafından Jail cezası kaldırıldı.`)
          .addFields(
            { name: "Affedilen",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
            { name: "Affeden",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
            { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
            )
          .setFooter({ text:`${moment(Date.now()).format("LLL")}` })

          message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});
  },
};

