const { PermissionsBitField, EmbedBuilder, AuditLogEvent, ChannelType } = require("discord.js");
const CategoryChannels = require("../../../../src/Models/CategoryChannels");
const TextChannels = require("../../../../src/Models/TextChannels");
const VoiceChannels = require("../../../../src/Models/VoiceChannels");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;

const tdata = await TextChannels.findOne({ channelID: channel.id });
const vdata = await VoiceChannels.findOne({ channelID: channel.id });
const cdata = await CategoryChannels.findOne({ channelID: channel.id });

let newChannel;
if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
if (!channel.id) return;
if (!tdata) return;
newChannel = await channel.guild.channels.create( { name:channel.name, 
type: channel.type,
topic: channel.topic,
nsfw: channel.nsfw,
parent: channel.parent,
rateLimitPerUser: channel.rateLimitPerUser,
position: tdata.position,
});
newChannel.setPosition(tdata.position)
await TextChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });
}
if (channel.type === ChannelType.GuildVoice) {
if (!channel.id) return;
if (!vdata) return;
newChannel = await channel.guild.channels.create({ name: channel.name,
type: channel.type,
bitrate: channel.bitrate,
userLimit: channel.userLimit,
parent: channel.parent,
position: vdata.position
});
newChannel.setPosition(vdata.position)
await VoiceChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });
}
if (channel.type === ChannelType.GuildCategory) {
if (!channel.id) return;
 if (!cdata) return;
    const newChannel2 = await channel.guild.channels.create({ name: cdata.name, 
      type: ChannelType.GuildCategory,
      position: cdata.position,
    });
    newChannel2.setPosition(cdata.position)
    const textChannels = await TextChannels.find({ parentID: channel.id });
    await TextChannels.updateMany({ parentID: channel.id }, { parentID: newChannel2.id });
    textChannels.forEach(c => {
      const textChannel = channel.guild.channels.cache.get(c.channelID);
      if (textChannel) textChannel.setParent(newChannel2, { lockPermissions: false });
    });
    const voiceChannels = await VoiceChannels.find({ parentID: channel.id });
    await VoiceChannels.updateMany({ parentID: channel.id }, { parentID: newChannel2.id });
    voiceChannels.forEach(c => {
      const voiceChannel = channel.guild.channels.cache.get(c.channelID);
      if (voiceChannel) voiceChannel.setParent(newChannel2, { lockPermissions: false });
    });
    const newOverwrite = [];
    for (let index = 0; index < cdata.overwrites.length; index++) {
      const veri = cdata.overwrites[index];
      newOverwrite.push({
        id: veri.id,
        allow: new PermissionsBitField(veri.allow).toArray(),
        deny: new PermissionsBitField(veri.deny).toArray()
      });
    }
    await newChannel2.permissionOverwrites.set(newOverwrite);
    await VoiceChannels.updateMany({ channelID: channel.id }, { channelID: newChannel2.id });

return };

channel.permissionOverwrites.cache.forEach(perm => {
let thisPermOverwrites = {};
perm.allow.toArray().forEach(p => {
  thisPermOverwrites[p] = true;
});
perm.deny.toArray().forEach(p => {
  thisPermOverwrites[p] = false;
});
newChannel.permissionOverwrites.create(perm.id, thisPermOverwrites);
});
};

module.exports.conf = {
  name: "channelDelete",
};