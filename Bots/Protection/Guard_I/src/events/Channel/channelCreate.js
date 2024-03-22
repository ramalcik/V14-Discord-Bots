const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Executive/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
let channelCreateLimit = {};

module.exports = async (channel) => {
  
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate }).then(audit => audit.entries.first());
if (!entry || !entry.executor || entry.executor.bot  || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) {
const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi kanal oluşturdu \`${moment(Date.now()).format("LLL")}\`

Yetkili (${entry.executor} - \`${entry.executor.id}\`) güvenli listede bulunduğu için işlem yapmadım`)
  
return channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
}

if (!channelCreateLimit[entry.executor.id]) channelCreateLimit[entry.executor.id] = 0;
if (channelCreateLimit[entry.executor.id] >= allah.Guard.Limit.ChannelCreate) {
channelCreateLimit[entry.executor.id] = 0;

let member = channel.guild.members.cache.get(entry.executor.id); 

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
  .setCustomId("cezaac")
  .setDisabled(conf.jailRole.some(x => member.roles.cache.has(x)) ? true : false)
  .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
  new ButtonBuilder()
  .setCustomId("yetkileriac")
  .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
)


const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi \`${allah.Guard.Limit.ChannelCreate}\` limitinden fazla kanal açmayı denediği için jaile attım

Yetkili: (${entry.executor} - \`${entry.executor.id}\`) \`${moment(Date.now()).format("LLL")}\``)

let papazGuardLog = await channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

var filter = (button) => conf.sahipRolu.some(x => x == button.member.roles.cache.has(x)) || allah.owners.includes(button.user.id);
const collector = await papazGuardLog.createMessageComponentCollector({ filter });

collector.on('collect', async (button) => {
  if (button.customId == "cezaac") {
      member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde ${entry.executor} (\`${entry.executor.id}\`) kişisinin jailini kaldırdın!`, ephemeral: true })
  }
  if (button.customId == "yetkileriac") {
      client.allPermissionOpen();
      button.reply({ content: `${button.user} Tebrikler! Başarılı bir şekilde sunucudaki rollerin yetkilerini açtın!`, ephemeral: true })
  }
})

return 
}

channelCreateLimit[entry.executor.id] += 1;
setTimeout(() => {
channelCreateLimit[entry.executor.id] = 0;
}, 1000 * 60 * 3);

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesinin geriye kalan kanal açma limiti: \`${channelCreateLimit[entry.executor.id]}/${allah.Guard.Limit.ChannelCreate}\`.

Yetkili (${entry.executor} - \`${entry.executor.id}\`) \`${moment(Date.now()).format("LLL")}\``)

return channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
};

module.exports.conf = {
  name: "channelCreate",
};