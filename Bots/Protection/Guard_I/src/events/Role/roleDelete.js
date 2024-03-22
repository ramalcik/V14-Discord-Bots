const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Executive/src/configs/sunucuayar.json");
const RoleModel = require("../../../../src/Models/Role");
const SafeMember = require("../../../../src/Models/Safe");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
const Bots = require("../../../../Backup")

module.exports = async (role) => {
let veri = await SafeMember.findOne({
    guildID: role.guild.id
}) || {
    "Full": [],
    "RoleAndChannel": [],
    "Role": [],
    "Channel": [],
    "Bot": [],
    "BanAndKick": [],
    "ChatG": [],
    "Permissions": [],
    "SafeRole": []
};
let entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete }).then(audit => audit.entries.first());
if (entry.executor.bot) return;
if ((!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) && !veri.SafeRole.includes(role.id)) {

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} üyesi rol sildi 

> güvenli listede bulunduğu için işlem yapmadım \`${moment(Date.now()).format("LLL")}\`

> Yetkili (${entry.executor} - \`${entry.executor.id}\`)
> Silinen Rol ${role.name} - \`${role.id}\`

`)

return role.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
}

let data = await RoleModel.findOne({ guildID: role.guild.id, roleID: role.id })

if (!data || data?.members.length <= 0) {
const papaz = new EmbedBuilder() 
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} üyesi rol sildi 

> sunucudan yasakladım ancak silinen rol için bir veri olmadığı için hiçbir şey yapamadım. Niye backup almıyorsun ki davar \`${moment(Date.now()).format("LLL")}\`

> Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
> Silinen Rol: ${role.name} - \`${role.id}\``)

return role.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
}

let length = data.members.length;

let member = role.guild.members.cache.get(entry.executor.id); 

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
> ${entry.executor} üyesi rol sildi

> \`Bildirim\` sunucudan yasakladım. Tarih: \`${moment(Date.now()).format("LLL")}\`

> Yetkili (${entry.executor} - \`${entry.executor.id}\`)
> Silinen Rol ${role.name} - \`${role.id}\`
**Aktif İşlem**
\`\`\`cs
Role sahip ${data.members.length} üyeye ${Bots.length ? Bots.length : "0"}'ı bot üye olmak üzere rolü destekçiler ile birlikte dağıtmaya başlıyorum
İşlemin biteceği tahmini süre: ${(length>1000 ? parseInt((length*(allah.Guard.Guard.GiveRoleDelay/1000)) / 60)+" dakika" : parseInt(length*(allah.Guard.Guard.GiveRoleDelay/1000))+" saniye")}
\`\`\`
`)

let papazGuardLog = await role.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

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
};

module.exports.conf = {
  name: "roleDelete",
};