const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const allah = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const { EmbedBuilder, ActivityType } = require("discord.js")
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
 
};

module.exports.conf = {
  name: "ready",
};
