const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../Executive/src/configs/sunucuayar.json");
const allah = require("../../../../../../config.json");
const request = require('request');
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
    if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;   

    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
    request({
    method: "PATCH",
    url: `https://discord.com/api/v9/guilds/${allah.GuildID}/vanity-url`,
    headers: { 
      "Authorization": `${allah.Guard.Token.UrlGuardToken}`,
      "User-Agent": `papaz Url Guard`,
      "Content-Type": `application/json`,
      "X-Audit-Log-Reason": `Hello i am under the watter`
    },
    body: { "code": setup.serverUrl },
    json: true
    });
    }
};

module.exports.conf = {
  name: "guildUpdate",
};