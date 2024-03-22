const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../Executive/src/configs/sunucuayar.json");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
    if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full")) return;
    if (newGuild.name !== oldGuild.name) await newGuild.setName(oldGuild.name);
    if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
    if (oldGuild.banner !== newGuild.banner) await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
};

module.exports.conf = {
  name: "guildUpdate",
};