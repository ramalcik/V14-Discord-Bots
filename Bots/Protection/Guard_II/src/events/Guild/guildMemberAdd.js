const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (member) => {
if (!member.user.bot) return;

let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.BotAdd }).then(audit => audit.entries.first());
if (!entry || await client.checkPermission(client, entry.executor.id, "bot")) return;

let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
if (victimMember) {
    await client.cezaVer(client, victimMember.id, "ban")
    await client.cezaVer(client, member.id, "ban")
    client.allPermissionClose();
}
};

module.exports.conf = {
  name: "guildMemberAdd",
};