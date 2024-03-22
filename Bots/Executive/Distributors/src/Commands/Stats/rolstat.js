const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { red } = require("../../../../src/configs/emojis.json");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const streamerUser = require("../../../../src/schemas/streamerUser");
const cameraUser = require("../../../../src/schemas/cameraUser");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["rstat","rolstat"],
      name: "rolstat",
      help: "rolstat",
      category: "stat",
    },
  
run: async (client, message, args, prefix) => {
  let kanallar = ayar.ownerkomutkulanım;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    const sec = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

    if (!sec) return  message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Lütfen statsına bakmak istediğiniz bir sunucu rolü belirtiniz!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  

    if (sec) {
      if(!client.guilds.cache.get(allah.GuildID).roles.cache.get(sec.id)) {
        return message.reply({ embeds: [new EmbedBuilder()
          .setThumbnail()
          .setDescription(`${red} Sunucuda belirttiğiniz rol bulunmamaktadır. Lütfen Kontrol Ediniz!`)
          ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
      }

    const messageData = async (type) => {
    let data = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    data = data.filter((x) => message.guild.members.cache.has(x.userID) && message.guild.members.cache.get(x.userID).roles.cache.has(sec.id));
    return data.length > 0 ? data.map((x, index) => `${index + 1} ${client.guilds.cache.get(allah.GuildID).members.cache.get(x.userID).user.tag} : ${Number(x[type]).toLocaleString()} mesaj`) .join("\n") : "Veri bulunmuyor!";
    }
    const voiceData = async (type) => {
    let data = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    data = data.filter((x) => message.guild.members.cache.has(x.userID) && message.guild.members.cache.get(x.userID).roles.cache.has(sec.id));
    return data.length > 0 ? data.map((x, index) => `${index + 1} ${client.guilds.cache.get(allah.GuildID).members.cache.get(x.userID).user.tag} : ${moment.duration(x[type]).format("H [saat], m [dakika] s [saniye]")}`) .join("\n") : "Veri bulunmuyor!";
    }
    const yayındata = async (type) => {
    let data = await streamerUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    data = data.filter((x) => message.guild.members.cache.has(x.userID) && message.guild.members.cache.get(x.userID).roles.cache.has(sec.id));
    return data.length > 0 ? data.map((x, index) => `${index + 1} ${client.guilds.cache.get(allah.GuildID).members.cache.get(x.userID).user.tag} : ${moment.duration(x[type]).format("H [saat], m [dakika] s [saniye]")}`) .join("\n") : "Veri bulunmuyor!";
    }
    const kameradata = async (type) => {
    let data = await cameraUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    data = data.filter((x) => message.guild.members.cache.has(x.userID) && message.guild.members.cache.get(x.userID).roles.cache.has(sec.id));
    return data.length > 0 ? data.map((x, index) => `${index + 1} ${client.guilds.cache.get(allah.GuildID).members.cache.get(x.userID).user.tag} : ${moment.duration(x[type]).format("H [saat], m [dakika] s [saniye]")}`) .join("\n") : "Veri bulunmuyor!";
    }
   
    let text = `────────────────────────────────────

➥ ${client.guilds.cache.get(allah.GuildID).roles.cache.get(sec.id).name} Rolündeki Üyeler ve Ses Bilgileri:

${await voiceData("topStat")}

────────────────────────────────────

➥ ${client.guilds.cache.get(allah.GuildID).roles.cache.get(sec.id).name} Rolündeki Üyeler ve Mesaj Bilgileri:

${await messageData("topStat")}

────────────────────────────────────

➥ ${client.guilds.cache.get(allah.GuildID).roles.cache.get(sec.id).name} Rolündeki Üyeler ve Yayın Bilgileri:

${await yayındata("topStat")}

────────────────────────────────────

➥ ${client.guilds.cache.get(allah.GuildID).roles.cache.get(sec.id).name} Rolündeki Üyeler ve Kamera Bilgileri:

${await kameradata("topStat")}

────────────────────────────────────`

message.channel.send({ content:`${client.guilds.cache.get(allah.GuildID).roles.cache.get(sec.id).toString()} rolüne sahip üyelerin verileri;`, files: [{ attachment: Buffer.from(text), name: "rolstat.js" }] });

    }
},
};
  
