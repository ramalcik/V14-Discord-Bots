const { GuildMember, TextChannel, EmbedBuilder, WebhookClient, ChannelType, PermissionsBitField} = require("discord.js");
const RoleModel = require("../../../src/Models/Role");
const SafeMember = require("../../../src/Models/Safe");
const CategoryChannels = require("../../../src/Models/CategoryChannels");
const TextChannels = require("../../../src/Models/TextChannels");
const VoiceChannels = require("../../../src/Models/VoiceChannels");
const client = global.bot;
const allah = require("../../../../../config.json");
const setup = require('./../../../../Executive/src/configs/sunucuayar.json');
const request = require("request");
const penals = require("./../../../../Executive/src/schemas/penals");

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

    client.rolbackup = async () => {
      const guild = client.guilds.cache.get(allah.GuildID);
        let members = await guild.members.fetch();
        guild.roles.cache.filter(e => e.name !== "@everyone" && !e.managed).forEach(async role => {
            let roleChannelOverwrites = [];
            await guild.channels.cache.filter(c => c.permissionOverwrites?.cache.has(role.id)).forEach(c => {
                let channelPerm = c.permissionOverwrites.cache.get(role.id);
                let pushlanacak = {
                    id: c.id,
                    allow: channelPerm.allow.toArray(),
                    deny: channelPerm.deny.toArray()
                };
                roleChannelOverwrites.push(pushlanacak);
            });
      
            await RoleModel.updateOne({
                roleID: role.id
            }, {
                $set: {
                    guildID: guild.id,
                    roleID: role.id,
                    name: role.name,
                    color: role.hexColor,
                    hoist: role.hoist,
                    position: role.position,
                    permissions: role.permissions.bitfield,
                    mentionable: role.mentionable,
                    time: Date.now(),
                    members: role.members.map(m => m.id),
                    channelOverwrites: roleChannelOverwrites
                }
            }, {
                upsert: true
            });
        });
      
      console.log("Bütün Rol verileri başarı ile kayıt edildi.")
      };

      client.kanalbackup = async () => {
        const guild = client.guilds.cache.get(allah.GuildID);
          if (guild) {
            const channels = [...guild.channels.cache.filter(kanal => kanal.deleted !== true).values()];
            for (let index = 0; index < channels.length; index++) {
                  const channel = channels[index];
                  let ChannelPermissions = []
                  channel.permissionOverwrites?.cache.forEach(perm => {
                      ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
                  });
                
                  if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
                    await TextChannels.updateOne({
                        channelID: channel.id,
                    }, {
                        $set: {
                            channelID: channel.id,
                            name: channel.name,
                            nsfw: channel.nsfw,
                            parentID: channel.parentId,
                            position: channel.position,
                            rateLimit: channel.rateLimitPerUser,
                            overwrites: ChannelPermissions,
                        }
                    }, {
                        upsert: true
                    });
                  }
                  if (channel.type === ChannelType.GuildVoice) {
                    await VoiceChannels.updateOne({
                        channelID: channel.id,
                    }, {
                        $set: {
                            channelID: channel.id,
                            name: channel.name,
                            bitrate: channel.bitrate,
                            userLimit: channel.userLimit,
                            parentID: channel.parentId,
                            position: channel.position,
                            overwrites: ChannelPermissions,
                        }
                    }, {
                        upsert: true
                    });
                  }
                  if (channel.type === ChannelType.GuildCategory) {
                    await CategoryChannels.updateOne({
                        channelID: channel.id,
                    }, {
                        $set: {
                            channelID: channel.id,
                            name: channel.name,
                            position: channel.position,
                            overwrites: ChannelPermissions,
                        }
                    }, {
                        upsert: true
                    });
                  }
              }
              console.log("Bütün Kanal verileri başarı ile kayıt edildi.")
          }}

// Rol yedeğini al ve loga düşür
const backupRolesAndChannels = async () => {
    try {
        await client.rolbackup();
        await client.kanalbackup();

        const logChannel = client.channels.cache.find(channel => channel.name === "backup_log");
        if (logChannel) {
            const timestamp = new Date().toLocaleString();
            logChannel.send(`Rol ve kanal yedekleme işlemi tamamlandı`);
        } else {
            console.log("Backup Log kanalı bulunamadı.");
        }
    } catch (error) {
        console.error("Yedekleme sırasında hata oluştu:", error);
    }
};

// Her 10 dakikada bir rol ve kanal yedeğini al
setInterval(backupRolesAndChannels, 1 * 60 * 1000);


          client.allPermissionOpen = async () => {
            const Koru = require('../../../src/Models/Koruma');
            let sunucu = client.guilds.cache.get(allah.GuildID);
            if(!sunucu) return;
            let veri = await Koru.find({});
            veri.filter(x => sunucu.roles.cache.get(x.Role)).forEach(async (data) => {
                let rolgetir = sunucu.roles.cache.get(data.Role)
                if(rolgetir) rolgetir.setPermissions(data.Permissions);
            })
            await Koru.deleteMany({ guildID: sunucu.id });
        };

        client.penalize = async (guildID, userID, type, active = true, staff, reason, temp = false, finishDate = undefined) => {
            let id = await penals.find({ guildID });
            id = id ? id.length + 1 : 1;
            return await new penals({ id, userID, guildID, type, active, staff, reason, temp, finishDate }).save();
        };
};
