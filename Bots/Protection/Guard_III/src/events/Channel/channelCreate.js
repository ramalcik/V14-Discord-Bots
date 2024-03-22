const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
let channelCreateLimit = {};

module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate }).then(audit => audit.entries.first());
if (!entry || !entry.executor || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (!channelCreateLimit[entry.executor.id]) channelCreateLimit[entry.executor.id] = 0;
if (channelCreateLimit[entry.executor.id] >= allah.Guard.Limit.ChannelCreate) {
channelCreateLimit[entry.executor.id] = 0;
await channel.delete({ reason: `Guard Koruma Tarafından Silindi.` })
}

channelCreateLimit[entry.executor.id] += 1;
setTimeout(() => {
channelCreateLimit[entry.executor.id] = 0;
}, 1000 * 60 * 3);
};

module.exports.conf = {
  name: "channelCreate",
};