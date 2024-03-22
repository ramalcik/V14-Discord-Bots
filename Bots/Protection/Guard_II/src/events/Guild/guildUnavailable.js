const { EmbedBuilder, AuditLogEvent, PermissionsBitField } = require("discord.js");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (guild) => {
let entry = await guild.guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
client.cezaVer(client, entry.executor.id, "ban");
client.allPermissionClose();
};

module.exports.conf = {
  name: "guildUnavailable",
};