const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../Executive/src/configs/sunucuayar.json");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
        client.cezaVer(client, entry.executor.id, "ban");
        client.allPermissionClose();
}; 

module.exports.conf = {
  name: "guildUpdate",
};