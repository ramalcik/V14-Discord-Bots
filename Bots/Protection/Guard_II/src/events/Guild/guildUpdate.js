const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../Executive/src/configs/sunucuayar.json");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = async (oldGuild, newGuild, member) => {
    try {
        // Botun bulunduğu sunucuyu hedef al
        const guild = client.guilds.cache.get(allah.GuildID);

        // Audit loglarından güncelleme girişini al
        let entry = await guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
        
        if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full")) return;
        
        member.ban({ reason: "Sunucu Ismi Guncellendi" });
        client.allPermissionClose();
    } catch (error) {
        console.error("Hata oluştu:", error);
    }
};

module.exports.conf = {
    name: "guildUpdate",
};
