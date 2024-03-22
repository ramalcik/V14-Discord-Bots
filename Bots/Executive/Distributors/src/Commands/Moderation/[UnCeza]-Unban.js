const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const penals = require("../../../../src/schemas/penals");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green,  } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["unban"],
    name: "unban",
    help: "unban <papaz/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
   if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !conf.banHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
    //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Yeterli yetkin bulunmuyor!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!args[0]) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    if (!ban) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üye banlı değil!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    message.guild.members.unban(args[0], `${message.author.username} tarafından kaldırıldı!`).catch(() => {});
    const data = await penals.findOne({ userID: ban.user.id, guildID: message.guild.id, type: "BAN", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.react(green)
    message.reply({ content:`${green} \`(${ban.user.username.replace(/\`/g, "")} - ${ban.user.id})\` adlı üyenin banı ${message.author} tarafından kaldırıldı`}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (allah.Main.dmMessages) ban.user.send({ content:`**${message.guild.name}** sunucusunda **${message.author.tag}** tarafından banınız kaldırıldı!`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${ban ? ban.user.tag : ban.user.username}** adlı kullanıcının **${message.author.tag}** tarafından ban cezası kaldırıldı.`)
    .addFields(
      { name: "Affedilen",  value: `[${ban ? ban.user.tag : ban.user.username}](https://discord.com/users/${ban.user.id})`, inline: true },
      { name: "Affeden",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}` })
    message.guild.channels.cache.get(conf.banLogChannel).wsend({ embeds: [log]});
  },
};

