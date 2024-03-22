const { ButtonStyle, ComponentType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { ses, mesaj, mute, nokta, istatistik, canlidestek, yetkili, gorevli, red, green,info } = require("../../../../src/configs/emojis.json");
const messageUserChannel = require("../../../../src/schemas/messageUserChannel");
const voiceUserChannel = require("../../../../src/schemas/voiceUserChannel");
const streamerUserChannel = require("../../../../src/schemas/streamerUserChannel");
const cameraUserChannel = require("../../../../src/schemas/cameraUserChannel");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const isimler = require("../../../../src/schemas/names");
const register = require("../../../../src/schemas/registerStats");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviterMember = require("../../../../src/schemas/inviteMember");
const streamerUser = require("../../../../src/schemas/streamerUser");
const cameraUser = require("../../../../src/schemas/cameraUser");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const Canvas = require("canvas");
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["me","stat"],
      name: "stat",
      help: "stat",
      category: "stat",
    },
  
run: async (client, message, args, prefix) => {
  
  let kanallar = ayar.ownerkomutkulanım;
  if (!message.member.permissions.has(8n) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    await client.guilds.cache.get(allah.GuildID).members.fetch(member.user.id)

    const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [Saat], m [Dakika] s [Saniye]");
      };

      const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
      const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [Saat], m [Dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [Saat], m [Dakika]");

      let nameData = await isimler.findOne({ guildID: message.guild.id, userID: member.id });

      const roles = member.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
      const rolleri = []
      if (roles.length > 6) {
          const lent = roles.length - 6
          let itemler = roles.slice(0, 6)
          itemler.map(x => rolleri.push(x))
          rolleri.push(`${lent} daha...`)
      } else {
          roles.map(x => rolleri.push(x))
      }
      const members = [...message.guild.members.cache.filter(x => !x.user.bot).values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
      const joinPos = members.map((u) => u.id).indexOf(member.id);
      const previous = members[joinPos - 1] ? members[joinPos - 1].user : null;
      const next = members[joinPos + 1] ? members[joinPos + 1].user : null;
      let nickname = member.displayName == member.username ? "" + member.username + " [Yok] " : member.displayName

      const yazı = [] 
      if(member.user.username.length > 15) {
      let yarrak = member.user.username.slice(0, 15)
         yazı.push(`${yarrak}...`)  
        } else {
        yazı.push(`${member.user.tag}`)
        }

        
message.react(green)
const papaz31 = new EmbedBuilder()
.setColor("Random")
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setFooter({text : `${message.guild.name} | Veri Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`
${info} **Hesap :** ${member}
${info} **Kullanıcı ID :** \`${member.id}\`
${info} **Sunucu İsmi :** \`${nickname}\`
${info} **Katılım Sırası :** \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
${info} **Kuruluş Tarihi :** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
${info} **Katılım Tarihi :** <t:${Math.floor(member.joinedAt / 1000)}:R>

${yetkili} **Kişinin Rol Bilgisi!**

${green}  **Bazı Rolleri :** \`(${rolleri.length})\`: ${rolleri.join(", ")}
${green}  **İsim geçmişi :** \`${nameData ? `${nameData.names.length}` : "0"}\` 
${nameData ? nameData.names.splice(0, 1).map((x, i) => `\` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""}`).join("\n") : ""}

${yetkili} **Toplam Ses,Mesaj Sıralama**
\`\`\`fix
• Toplam Ses : ${voiceDaily}
• Toplam Mesaj : ${messageData ? messageData.topStat : 0} Mesaj
\`\`\`
${yetkili} **Detaylı Ses Sıralama**
\`\`\`fix
• Haftalık Ses : ${voiceWeekly}
• Günlük Ses : ${voiceDaily}
\`\`\`
${yetkili} **Detaylı Mesaj Sıralama**
\`\`\`fix
• Haftalık Mesaj : (${Number(messageWeekly).toLocaleString()} Mesaj)
• Günlük Mesaj : (${Number(messageDaily).toLocaleString()} Mesaj)
\`\`\`
\`\`\`fix
• Public Odalar: ${await category(conf.publicParents)}
• Secret Odalar: ${await category(conf.privateParents)}
• Alone Odalar: ${await category(conf.aloneParents)}
• Yönetim Yetkili Odaları: ${await category(conf.funParents)}
• Kayıt Odaları: ${await category(conf.registerParents)}
\`\`\`
`)
    message.reply({ embeds: [papaz31]})


  }}

 