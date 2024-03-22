const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const allah = require("../../../../../../config.json");
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
        await client.cezaVer(client, victimMember.id, "ban")
        client.allPermissionClose();
    }
    KickLimit[entry.executor.id].Now += 1;
} else if (!KickLimit[entry.executor.id]) {
    KickLimit[entry.executor.id] = {
        Now: 1,
        Last: Date.now()
    };
} else {
    KickLimit[entry.executor.id].Now += 1;
    setTimeout(() => {
        KickLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        }
    }, 1000 * 60 * 3);
}
};

module.exports.conf = {
  name: "guildMemberRemove",
};