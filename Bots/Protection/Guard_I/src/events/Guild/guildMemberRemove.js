const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Executive/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (member) => {
let KickLimit = {};

let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick }).then(audit => audit.entries.first());
if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (entry.executor.id === member.id) return;

let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
if (KickLimit[entry.executor.id] && KickLimit[entry.executor.id].Now + 1 > allah.Guard.Limit.Kick) {
    if (victimMember) {
        KickLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }
    KickLimit[entry.executor.id].Now += 1;

    let members = member.guild.members.cache.get(entry.executor.id); 

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("cezaac")
            .setDisabled(members.bannable ? false : true)
            .setLabel("Ceza Kaldır").setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId("yetkileriac")
        .setLabel("Yetki Aç").setStyle(ButtonStyle.Danger)
    )

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} yetkilisi \`${allah.Guard.Limit.Kick}\` Kick limitini geçtiği için sunucudan banlandı \`${moment(Date.now()).format("LLL")}\`

> Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
> Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\``)

let papazGuardLog = await member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

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
return; 
} else if (!KickLimit[entry.executor.id]) {
    KickLimit[entry.executor.id] = {
        Now: 1,
        Last: Date.now()
    };

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
> ${entry.executor} yetkilisi kalan Kick Limit: \`${1}/${allah.Guard.Limit.Kick}\` \`${moment(Date.now()).format("LLL")}\`

> Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
> Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\``)

return member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
} else {
    KickLimit[entry.executor.id].Now += 1;
    setTimeout(() => {
        KickLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }, 1000 * 60 * 3);

const papaz = new EmbedBuilder()
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
${entry.executor} yetkilisi kalan Kick Limit: **${KickLimit[entry.executor.id].Now}/${allah.Guard.Limit.Kick}**.

Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`

Tarih: \`${moment(Date.now()).format("LLL")}\``)

return member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz] });
}
};

module.exports.conf = {
  name: "guildMemberRemove",
};