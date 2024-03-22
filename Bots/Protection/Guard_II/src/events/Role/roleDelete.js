const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const RoleModel = require("../../../../src/Models/Role");
const SafeMember = require("../../../../src/Models/Safe");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
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
if ((!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) && !veri.SafeRole.includes(role.id)) return;

let member = await role.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
client.cezaVer(client, member.id, "ban")
client.allPermissionClose();
};

module.exports.conf = {
  name: "roleDelete",
};