const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (emoji) => {
let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiDelete }).then(audit => audit.entries.first());
if (!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
client.cezaVer(client, entry.executor.id, "jail");
client.allPermissionClose();
};

module.exports.conf = {
  name: "emojiDelete",
};