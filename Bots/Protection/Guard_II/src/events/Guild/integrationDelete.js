const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../../Executive/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (guild) => {
let entry = await guild.fetchAuditLogs({ type: AuditLogEvent.IntegrationDelete }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "bot")) return;
client.cezaVer(client, entry.executor.id, "jail");
client.allPermissionClose();
};

module.exports.conf = {
  name: "guildIntegrationsUpdate",
};