const { EmbedBuilder, ActivityType } = require("discord.js")
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
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

      client.rolbackup();
      client.kanalbackup();
      setInterval(async () => {
          await client.rolbackup();
          await client.kanalbackup();
      }, 1000 * 60 * 60 * 3)

};

module.exports.conf = {
  name: "ready",
};

