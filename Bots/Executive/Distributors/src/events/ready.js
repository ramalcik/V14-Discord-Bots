const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const { EmbedBuilder, ActivityType } = require("discord.js")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
module.exports = async () => {

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

setInterval(async () => {  
  const guild = client.guilds.cache.get(allah.GuildID);
  if (!guild) return;
  const finishedPenals = await penals.find({ guildID: guild.id, active: true, temp: true, finishDate: { $lte: Date.now() } });
  finishedPenals.forEach(async (x) => {
    const member = guild.members.cache.get(x.userID);
    if (!member) return;
    if (x.type === "CHAT-MUTE") { 
      x.active = false;
      await x.save();
      await member.roles.remove(conf.chatMute);
      client.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [
        new EmbedBuilder()
        .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **Chat-Mute** cezası süresi bittiği için kaldırıldı.`)
        .addFields(
          { name: "Affedilen",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
          { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
          )
        .setFooter({ text:`${moment(Date.now()).format("LLL")}` })]});
    } 
    if (x.type === "TEMP-JAIL") {
      x.active = false;
      await x.save();
      await member.setRoles(conf.unregRoles);
      client.channels.cache.get(conf.jailLogChannel).send({ embeds: [
        new EmbedBuilder()
        .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **Jail** cezası süresi bittiği için kaldırıldı.`)
        .addFields(
          { name: "Affedilen",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
          { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
          )
        .setFooter({ text:`${moment(Date.now()).format("LLL")}` })]});
    } 
    if (x.type === "VOICE-MUTE") {
      if (member.voice.channelId) {
        x.removed = true;
        await x.save();
        if (member.voice.serverMute) member.voice.setMute(false);
      }
      x.active = false;
      await x.save();
      member.roles.remove(conf.voiceMute);
      client.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [
        new EmbedBuilder()
        .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **Voice-Mute** cezası süresi bittiği için kaldırıldı.`)
        .addFields(
          { name: "Affedilen",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
          { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
          )
        .setFooter({ text:`${moment(Date.now()).format("LLL")}` })]});
    } 
  });

  const activePenals = await penals.find({ guildID: guild.id, active: true });
  activePenals.forEach(async (x) => {
    const member = guild.members.cache.get(x.userID);
    if (!member) return;
    if (x.type === "CHAT-MUTE" && !conf.chatMute.some((x) => member.roles.cache.has(x))) return member.roles.add(conf.chatMute);
    if ((x.type === "JAIL" || x.type === "TEMP-JAIL") && !conf.jailRole.some((x) => member.roles.cache.has(x))) return member.setRoles(conf.jailRole);
    if (x.type === "VOICE-MUTE") {
      if (!conf.voiceMute.some((x) => member.roles.cache.has(x))) member.roles.add(conf.voiceMute);
      if (member.voice.channelId && !member.voice.serverMute) member.voice.setMute(true);
    }
  });
}, 750);
};

module.exports.conf = {
  name: "ready",
};
