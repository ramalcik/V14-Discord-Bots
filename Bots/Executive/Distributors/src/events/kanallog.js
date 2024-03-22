const { Events } = require('discord.js')
const channelLogData = require('../../../src/schemas/channelData');
const client = global.client;

module.exports = async (oldState, newState) => {
    if(oldState?.member.user.bot || newState?.member.user.bot) return;
    if (!oldState.channel && newState.channel) {
        await channelLogData.updateOne({
            guildId: newState.guild.id,
            userId: newState.id
        }, {
            $push: {
                channelData: {
                    type: 'Connect',
                    date: Date.now(),
                    channelName: newState.channel.name
                }
            }
        }, {upsert: true})
    }

    if (oldState.channel && !newState.channel) {
        await channelLogData.updateOne({
            guildId: oldState.guild.id,
            userId: oldState.id
        }, {
            $push: {
                channelData: {
                    type: 'Disconnect',
                    date: Date.now(),
                    channelName: oldState.channel.name
                }
            }
        }, {upsert: true})
    }

    if (oldState.channel && newState.channel) {
        await channelLogData.updateOne({
            guildId: newState.guild.id,
            userId: newState.id
        }, {
            $push: {
                channelData: {
                    type: 'Move',
                    date: Date.now(),
                    oldChannelName: oldState.channel.name,
                    newChannelName: newState.channel.name
                }
            }
        }, {upsert: true})
    }
}
module.exports.conf = {
    name: "voiceStateUpdate",
  };