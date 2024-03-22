const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const meetings = require("../../../src/schemas/meeting");
const { EmbedBuilder, ActivityType } = require("discord.js")
const tasks = require("../../../src/schemas/task")
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

let guild = client.guilds.cache.get(allah.GuildID);
await guild.members.fetch();

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(allah.GuildID);
if (connection) return;
setInterval(async () => {
const VoiceChannel = client.channels.cache.get(allah.BotSesKanal);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);

      let activities = allah.BotDurum, i = 0;
      setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
        type: ActivityType.Streaming,
        url: "https://www.twitch.tv/papazxd"}), 10000);
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: allah.GuildID })
  newData.save().catch(e => console.log(e))

  const newData2 = new regstats({ guildID: allah.GuildID })
  newData2.save().catch(e => console.log(e))

  let MeetingData = await meetings.findOne({ guildID: allah.GuildID })
  if(!MeetingData) {await meetings.updateOne({guildID: allah.GuildID}, {$set: {Toplantı: false}}, {upsert: true})}


  setInterval(() => { TagAlıncaKontrol(); }, 3 * 1000);
  setInterval(() => { TagBırakanKontrol(); }, 3 * 1000);
  setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);


  async function gorevKontrol() {
    client.guilds.cache.forEach(async (guild) =>
    await tasks.findOneAndUpdate({ guildID: guild.id, active: true, finishDate: { $lte: Date.now() } }, { active: false }))
    } 
    setInterval(() => { gorevKontrol(); }, 15* 1000)
  


async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma
const guild = client.guilds.cache.get(allah.GuildID);
let papaz = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
papaz.forEach(r => {
   if (conf.unregRoles) r.roles.add(conf.unregRoles)
   })
};


async function TagAlıncaKontrol() { // Tag alınca tarama
  const guild = client.guilds.cache.get(allah.GuildID);
  const tagArray = Array.isArray(conf.tag) ? conf.tag : ["?","santana"];
  const members = [...guild.members.cache.filter(member => tagArray && tagArray.some(tag => member.user.globalName && member.user.globalName.includes(tag) || member.user.username.includes(tag)) && !member.user.bot && !member.roles.cache.has(conf.jailRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10);
  for await (const member of members) {
    if (member.displayName.includes(conf.ikinciTag) && member.manageable) await member.setNickname(member.displayName.replace(conf.ikinciTag, conf.tag));
    if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
  }
};

  
  async function TagBırakanKontrol() { // Tagı olmayanın family rol çekme
  const tagModedata = await regstats.findOne({ guildID: allah.GuildID })
  const guild = client.guilds.cache.get(allah.GuildID)
const tagArray = Array.isArray(conf.tag) ? conf.tag : ["?","santana"];
const memberss = [...guild.members.cache.filter(member => !tagArray.some(tag => member.user.globalName && member.user.globalName.includes(tag) || member.user.username.includes(tag)) && !member.user.bot && member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10);
  for await (const member of memberss) {
  if(member.displayName.includes(conf.tag) && member.manageable) await member.setNickname(member.displayName.replace(conf.tag, conf.ikinciTag)).catch(e => { });
  if (conf.unregRoles) {
  if (tagModedata && tagModedata.tagMode === true) {
  if(!member.roles.cache.has(conf.boosterRolu)) {
  await member.roles.set(conf.unregRoles)
  return}
  }
  } 
  if (conf.ekipRolu) {
  await member.roles.remove(conf.ekipRolu);
  }
  }
  };
  };
  
  module.exports.conf = {
    name: "ready",
  };
  