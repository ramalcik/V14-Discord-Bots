const { Client, Partials, AuditLogEvent } = require("discord.js");
const allah = require("../../../config.json");
const Bots = require("../Backup")
const client = (global.bot = new Client({ 
    fetchAllMembers: true, 
    intents: [ 3276799 ],
    partials: [
      Partials.User, 
      Partials.Channel, 
      Partials.GuildMember,
      Partials.Message,
      Partials.Reaction,
      Partials.GuildScheduledEvent,
      Partials.ThreadMember
    ], }));

client
.login(allah.Guard.Token.Guard_III)
.then(() => console.log("Bot Başarıyla Bağlandı!"))
.catch(() => console.log("[HATA] Bot Bağlanamadı!"));
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
});
  
process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
});


/*/client.on("roleDelete", async (role) => {
    try {
        const auditLog = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete });
        const entry = auditLog.entries.first();
        
        if (!entry || entry.executor.bot || 
            await client.checkPermission(client, entry.executor.id, "full") || 
            await client.checkPermission(client, entry.executor.id, "role") || 
            await client.checkPermission(client, entry.executor.id, "roleandchannel")) {
            return;
        }

        const newData = await RoleModel.findOne({ guildID: role.guild.id, roleID: role.id });
        if (!newData) return;

        const newRole = await role.guild.roles.create({
            name: newData.name,
            color: newData.color,
            hoist: newData.hoist,
            permissions: newData.permissions,
            position: newData.position,
            mentionable: newData.mentionable,
            reason: "Rol silindiği için tekrar oluşturuldu."
        });

        const channelPermissionsPromises = newData.channelOverwrites.map(async (perm) => {
            const channel = role.guild.channels.cache.get(perm.id);
            if (!channel) return;
            const newPermissions = {};
            perm.allow.forEach(p => newPermissions[p] = true);
            perm.deny.forEach(p => newPermissions[p] = false);
            await channel.permissionOverwrites.create(newRole, newPermissions);
        });
        await Promise.all(channelPermissionsPromises);

        await RoleModel.updateOne({ guildID: role.guild.id, roleID: role.id }, { roleID: newRole.id });

        const membersCount = newData.members.length;
        if (membersCount <= 0) return;

        const availableBots = Bots.filter(bot => !bot.Busy);
        if (availableBots.length <= 0) return;

        const perBotMembersCount = Math.floor(membersCount / availableBots.length) || 1;

        const promises = availableBots.map(async (bot) => {
            const ids = newData.members.splice(0, perBotMembersCount);
            if (ids.length <= 0) return;

            const guild = bot.guilds.cache.get(allah.GuildID);
            const botPromises = ids.map(async (id) => {
                const member = guild.members.cache.get(id);
                if (!member) {
                    console.log(`Oto Silinen Rol Kurulumundan sonra ${bot.user.username} - ${id} adlı üyeyi sunucuda bulamadım.`);
                    return;
                }
                try {
                    await member.roles.add(newRole.id);
                    console.log(`Oto Silinen Rol kurulumundan sonra ${bot.user.tag} - ${member.user.username} adlı üye ${newRole.name} rolünü aldı.`);
                } catch (error) {
                    console.error(`[${newRole.id}] Olayından sonra ${bot.user.username} - ${member.user.username} adlı üyeye rol veremedim.`);
                }
            });
            await Promise.all(botPromises);
        });
        await Promise.all(promises);

        const papaz = new EmbedBuilder()
            .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
            .setDescription(`
                ${entry.executor} üyesi rol sildi

                > Silinen Rol: ${role.name} - \`${role.id}\`
            `);

        const logChannel = role.guild.channels.cache.find(channel => channel.name === "protection_log");
        if (logChannel) logChannel.send({ embeds: [papaz] });
    } catch (error) {
        console.error("Hata oluştu:", error);
    }
});/*/

