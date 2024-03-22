const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (role) => {
let roleCreateLimit = {};
let entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (!roleCreateLimit[entry.executor.id]) roleCreateLimit[entry.executor.id] = 0;
if (roleCreateLimit[entry.executor.id] && roleCreateLimit[entry.executor.id] >= allah.Guard.Limit.RoleCreate) {
    roleCreateLimit[entry.executor.id] = 0;
    role.delete({
        reason: "Role Guard"
    })
};
    roleCreateLimit[entry.executor.id] += 1;
    setTimeout(() => {
        roleCreateLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);
};

module.exports.conf = {
  name: "roleCreate",
};