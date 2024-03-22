const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Executive/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
    let entry = await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate }).then(audit => audit.entries.first());
    if (!entry || !entry.executor || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
      let perms = [
        PermissionsBitField.Flags.Administrator,
        PermissionsBitField.Flags.ManageRoles,
        PermissionsBitField.Flags.ManageWebhooks,
        PermissionsBitField.Flags.ManageChannels,
        PermissionsBitField.Flags.ManageGuild,
        PermissionsBitField.Flags.BanMembers,
        PermissionsBitField.Flags.KickMembers,
        PermissionsBitField.Flags.MentionEveryone
    ]
    let diffRoles = newMember.roles.cache.filter(o => !oldMember.roles.cache.has(o.id));
    if (!diffRoles.some(e => perms.some(perm => e.permissions.has(perm)))) {
        return;
    }

    let member = newMember.guild.members.cache.get(entry.executor.id); 

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
      > ${entry.executor} üyesi Sunucu'dan izinsiz yönetici rolü verdi ve üyeden rolü alıp rolü veren kişiyi banladım \`${moment(Date.now()).format("LLL")}\`
      
      > Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
      > Kullanıcı: ${newMember.user} - \`${newMember.id}\` `)
      
      let papazGuardLog = await newMember.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [papaz], components: [row] });

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
  }
};

module.exports.conf = {
  name: "guildMemberUpdate",
};