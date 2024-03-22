const { GuildMember, TextChannel, EmbedBuilder, WebhookClient, ChannelType } = require("discord.js");
const RoleModel = require("../../../src/Models/Role");
const SafeMember = require("../../../src/Models/Safe");
const CategoryChannels = require("../../../src/Models/CategoryChannels");
const TextChannels = require("../../../src/Models/TextChannels");
const VoiceChannels = require("../../../src/Models/VoiceChannels");
const client = global.bot;
const allah = require("../../../../../config.json");
const setup = require('../../../../Executive/src/configs/sunucuayar.json');
const request = require("request");

module.exports = function (client) {

  client.checkPermission = async (bots, id, type) => {
    let member = client.guilds.cache.get(allah.GuildID).members.cache.get(id);
    let res = await SafeMember.findOne({
        guildID: allah.GuildID
    });

    if (!res) {
        res = {
            "Full": [],
            "RoleAndChannel": [],
            "Role": [],
            "Channel": [],
            "Bot": [],
            "BanAndKick": [],
            "ChatG": [],
            "SekmeG": []
        }
        await SafeMember.updateOne({
            guildID: allah.GuildID
        }, {}, {
            upsert: true,
            setDefaultsOnInsert: true
        }).exec()
    } else {
        if (allah.owners.some(uye => uye == member?member.id:false) || res.Full.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) {
            return true;
        }
        if (type == "full") {
            if (res.Full.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "role") {
            if (res.Role.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "roleandchannel") {
            if (res.RoleAndChannel.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "channel") {
            if (res.Channel.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false || member ? member.voice ? member.voice.channel.id == uye : false : false)) return true;
        } else if (type == "banandkick") {
            if (res.BanAndKick.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false) || res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "bot") {
            if (res.Bot.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "chatguard") {
            if (res.ChatG.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "sekmeguard") {
            if (res.SekmeG.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } return false;
    }
  };

  const Bots = require("../../../Backup")

  client.giveBot = async (length) => {
    if (length > Bots.length) length = Bots.length;
    let availableBots = Bots.filter(e => !e.Busy);
    if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => x.Uj - y.Uj).slice(0, length);

    return availableBots;
  };

  client.processBot = async (bot, busy, job, equal = false) => {
    bot.Busy = busy;
    if (equal) bot.Uj = job;
    else bot.Uj += job;

    let index = Bots.findIndex(e => e.user.id == bot.user.id);
    Bots[index] = bot;
  };

  client.getClients = async (count) => {
    return Bots.slice(0, count);
  };

  client.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
};
