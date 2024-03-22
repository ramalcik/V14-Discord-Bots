const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldEmoji, newEmoji) => {
let entry = await newEmoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiUpdate }).then(audit => audit.entries.first());
if (!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
await newEmoji.edit({ name: oldEmoji.name }, `${entry.executor.username} tarafından güncellenmeye çalışıldı.`)
};

module.exports.conf = {
  name: "emojiUpdate",
};