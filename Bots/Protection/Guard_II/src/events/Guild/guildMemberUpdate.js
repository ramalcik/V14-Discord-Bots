const { EmbedBuilder, AuditLogEvent, PermissionsBitField } = require("discord.js");
const allah = require("../../../../../../config.json");
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
      let member = await oldMember.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
      if (member) {
       await client.cezaVer(client, member.id, "ban")
       client.allPermissionClose();
      }
}
};

module.exports.conf = {
  name: "guildMemberUpdate",
};