const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (emoji) => {
let entry = await emoji.guild.fetchAuditLogs({ type: AuditLogEvent.EmojiDelete }).then(audit => audit.entries.first());
if (!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
};

module.exports.conf = {
  name: "emojiDelete",
};