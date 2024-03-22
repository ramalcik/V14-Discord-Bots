const { EmbedBuilder, AuditLogEvent, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Executive/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());
let member = channel.guild.members.cache.get(entry.executor.id); 
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) {
if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement) || (channel.type === ChannelType.GuildVoice)) {

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} üyesi kanal sildi \`${moment(Date.now()).format("LLL")}\`

> Yetkili güvenli listede olduğu için işlem yapmadım (${entry.executor} - \`${entry.executor.id}\`)

> Silinen Kanal ${channel.name} - \`${channel.id}\``)

return channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
} else if (channel.type === ChannelType.GuildCategory) {

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} üyesi kategori sildi \`${moment(Date.now()).format("LLL")}\`

> Yetkili güvenli listede olduğu için işlem yapmadım. (${entry.executor} - \`${entry.executor.id}\`)

> Silinen Kategori: ${channel.name} - \`${channel.id}\` `)
return channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });

}
}

if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {

  let member = channel.guild.members.cache.get(entry.executor.id); 

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(member.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )
  
const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} üyesi kanal sildi

> sunucudan yasaklayıp silinen kanalı izinleriyle birlikte yeniden oluşturdum \`${moment(Date.now()).format("LLL")}\`

> Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
> Silinen Kanal: ${channel.name} - \`${channel.id}\`
> Kanal Türü: \` Yazı Kanalı \``)

let papazGuardLog = await channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || allah.owners.includes(button.user.id);
const collector = await papazGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
} else if (channel.type === ChannelType.GuildVoice) {

  let member = channel.guild.members.cache.get(entry.executor.id); 

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(member.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} üyesi kanal sildi

> sunucudan yasaklayıpsilinen kanalı izinleriyle birlikte yeniden oluşturdum \`${moment(Date.now()).format("LLL")}\`

> Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
> Silinen Kanal: ${channel.name} - \`${channel.id}\`
> Kanal Türü: \` Ses Kanalı \``)

let papazGuardLog = await channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || allah.owners.includes(button.user.id);
const collector = await papazGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
} else if (channel.type === ChannelType.GuildCategory) {

  let member = channel.guild.members.cache.get(entry.executor.id); 
  
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("cezaac")
    .setDisabled(member.bannable ? false : true)
    .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
    .setCustomId("yetkileriac")
    .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
  )

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} üyesi kategori sildi

> sunucudan yasaklayıp, silinen kategoriyi izinleriyle birlikte yeniden oluşturup kanallarını içine taşıdım \`${moment(Date.now()).format("LLL")}\`

> Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
> Silinen Kategori: ${channel.name} - \`${channel.id}\``)

let papazGuardLog = await channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || allah.owners.includes(button.user.id);
const collector = await papazGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      button.guild.members.unban(entry.executor.id, `Buton Üzerinden Guard Banı Kaldırıldı!`)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin banını kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})
}
};

module.exports.conf = {
  name: "channelDelete",
};