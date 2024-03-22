const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldChannel, newChannel) => {
let entry = await newChannel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelOverwriteUpdate }).then(audit => audit.entries.first());
if (!entry || !entry.executor || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
await newChannel.edit({
  permissionOverwrites: oldChannel.permissionOverwrites.cache
});
};

module.exports.conf = {
  name: "channelUpdate",
};