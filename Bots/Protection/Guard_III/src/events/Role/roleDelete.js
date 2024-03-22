const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const RoleModel = require("../../../../src/Models/Role");
const SafeMember = require("../../../../src/Models/Safe");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
const Bots = require("../../../../Backup")

module.exports = async (role) => {
let veri = await SafeMember.findOne({
    guildID: role.guild.id
}) || {
    "Full": [],
    "RoleAndChannel": [],
    "Role": [],
    "Channel": [],
    "Bot": [],
    "BanAndKick": [],
    "ChatG": [],
    "Permissions": [],
    "SafeRole": []
};
let entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete }).then(audit => audit.entries.first());
if (entry.executor.bot) return;
if ((!entry || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) && !veri.SafeRole.includes(role.id)) return;

let data = await RoleModel.findOne({ guildID: role.guild.id, roleID: role.id })
if (!data) return;

const newRole = await role.guild.roles.create({
    name: data.name,
    color: data.color,
    hoist: data.hoist,
    permissions: data.permissions,
    position: data.position,
    mentionable: data.mentionable,
    reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
  });

  let kanalPermVeri = data.channelOverwrites.filter(e => client.guilds.cache.get(allah.GuildID).channels.cache.get(e.id))
  if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
    let kanal = role.guild.channels.cache.get(perm.id);
    if (!kanal) return;
    setTimeout(() => {
      let yeniKanalPermVeri = {};
      perm.allow.forEach(p => {
        yeniKanalPermVeri[p] = true;
      });
      perm.deny.forEach(p => {
        yeniKanalPermVeri[p] = false;
      });
      kanal.permissionOverwrites.create(newRole, yeniKanalPermVeri).catch(console.error);
    }, index * 5000);
  });

 await RoleModel.updateOne({ guildID: role.guild.id, roleID: role.id }, { $set: { roleID: newRole.id }})

 let length = data.members.length;
 let clientsCount = Bots.length
 let clients = client.getClients(clientsCount);

if (length <= 0) return;

let availableBots = Bots.filter(e => !e.Busy);
if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => y.Uj - x.Uj).slice(0, Math.round(length / Bots.length));
let perAnyBotMembers = Math.floor(length / availableBots.length);
if (perAnyBotMembers < 1) perAnyBotMembers = 1;
for (let index = 0; index < availableBots.length; index++) {
    const bot = availableBots[index];
    let ids = data.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
    if (ids.length <= 0) { client.processBot(bot, false, -perAnyBotMembers); break; }
    let guild = bot.guilds.cache.get(allah.GuildID); 
    ids.every(async id => {
    let member = guild.members.cache.get(id);
    if(!member){
    console.log(`Oto Silinen Rol Kurulumundan sonra ${bot.user.username} - ${id} adlı üyeyi sunucuda bulamadım.`);
    return true;}
    await member.roles.add(newRole.id).then(e => {console.log(`Oto Silinen Rol kurulumundan sonra ${bot.user.tag} - ${member.user.username} adlı üye ${newRole.name} rolünü aldı.`);}).catch(e => {console.log(`[${newRole.id}] Olayından sonra ${bot.user.username} - ${member.user.username} adlı üyeye rol veremedim.`);});});
     client.processBot(bot, false, -perAnyBotMembers); }
};

module.exports.conf = {
  name: "roleDelete",
};