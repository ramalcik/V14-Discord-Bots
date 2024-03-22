const { ButtonStyle, ComponentType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { ses, mesaj, mute, nokta, istatistik, canlidestek, yetkili, gorevli, red, green,info } = require("../../../../src/configs/emojis.json");
const messageUserChannel = require("../../../../src/schemas/messageUserChannel");
const voiceUserChannel = require("../../../../src/schemas/voiceUserChannel");
const streamerUserChannel = require("../../../../src/schemas/streamerUserChannel");
const cameraUserChannel = require("../../../../src/schemas/cameraUserChannel");
const CameraStat = require("../../../../src/schemas/CameraStat")
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
const StreamerStat = require("../../../../src/schemas/StreamerStat")
const moment = require("moment");
require("moment-duration-format");
const path = require('path');
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const Canvas = require('@napi-rs/canvas')
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
    conf: {
      aliases: ["stats"],
      name: "stats",
      help: "stats",
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

        const colorMap = {
            0: "#A7F9F9",
            1: "#F6CD46",
            2: "#C1853C",
          };
          

/*/const document = await friendShip.find({ id: member.id });
const topFriends = document && document.voiceFriends 
  ? 
    Object.keys(document.voiceFriends)
      .map(c => ({ id: c, total: document.voiceFriends[c] }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 1) 
  : 'Bulunmuyor.'

const theTopFriend = message.client.users.cache.get(topFriends[0].id)
var chatFriend = await friendShip2.find({ userID: member.id }).sort({ yanitSayi: -1 });
chatFriend = chatFriend.length > 0 ? await client.users.fetch(chatFriend[0]?.repliedUser) : undefined;/*/

        const messageUsersData2 = await messageUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
          messageUsersData2.sort((a, b) => b.TotalStat - a.TotalStat);
          const index = messageUsersData2.findIndex((x) => x.userID === member.user.id);
          const sıralama = index === -1 ? "Verisi Yok." : `${index + 1}. sırada`; 

          const voiceUsersData2 = await voiceUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
          voiceUsersData2.sort((a, b) => b.TotalStat - a.TotalStat);
          const index2 = voiceUsersData2.findIndex((x) => x.userID === member.user.id);
          const sıralama2 = index2 === -1 ? "Verisi Yok." : `${index2 + 1}. sırada`;
          
          const streamData = await StreamerStat.find({ guildID: message.guild.id });
          streamData.sort((a, b) => b.TotalStat - a.TotalStat);
          const index3 = streamData.findIndex((x) => x.userID === member.user.id);
          const sıralama3 = index3 === -1 ? "Verisi Yok." : `${index3 + 1}. sırada`; 

const cameraData = await CameraStat.find({ guildID: message.guild.id });
cameraData.sort((a, b) => b.TotalStat - a.TotalStat);
const index4 = cameraData.findIndex((x) => x.userID === member.user.id);
const sıralama4 = index4 === -1 ? "Verisi Yok." : `${index4 + 1}. sırada`; 

let canvas = Canvas.createCanvas(1152, 585),
ctx = canvas.getContext("2d");

// Resmin tam yolunu belirtin
const imagePath = path.resolve(__dirname, "../../../../src/Assets/stat-card.png");

// Resmi yükleyin
let background = await Canvas.loadImage(imagePath);

// Resmi çizin
ctx.drawImage(background, 0, 0, 1152, 585);

        ctx.font = '40px "DINNextLTPro-Bold"';
        ctx.fillStyle = '#FFFFFF';
        let ramalcik = member.user.username;
        ctx.fillText(`${ramalcik}`, canvas.width / 10.00, 63);
    
        ctx.font = '24px "DINNextLTPro-Bold"';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${moment(Date.now()).format("LLL")}`, canvas.width / 1.32, 63);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${sıralama2}`, canvas.width / 5.60, 183);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${sıralama}`, canvas.width / 5.60, 233);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${sıralama3}`, canvas.width / 5.60, 283);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${sıralama4}`, canvas.width / 5.60, 333);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${messageData ? messageData.topStat : 0} mesaj`, canvas.width / 1.97, 183, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${Number(messageDaily).toLocaleString()} mesaj`, canvas.width / 1.97, 233, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${Number(messageWeekly).toLocaleString()} mesaj`, canvas.width / 1.97, 283, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Veri Yoktur.`, canvas.width / 1.97, 333, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}`, canvas.width / 1.20, 183, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${voiceDaily}`, canvas.width / 1.20, 233, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${voiceWeekly}`, canvas.width / 1.20, 283, 200, 400);
    
        ctx.font = '21px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Veri Yoktur.`, canvas.width / 1.20, 333, 200, 400);
    
    
        ctx.font = '23px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Bulunamadı.`, canvas.width / 1.23, 463, 200, 400);
        
        ctx.font = '23px "DINNextLTPro-Bold"';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Bulunamadı.`, canvas.width / 1.23, 515, 200, 400);
    
        let image = await Canvas.loadImage(member.displayAvatarURL({ size: 128, extension: 'png' }))
        ctx.save();
        roundedImage(ctx,27,12,75,75,28);
        ctx.clip();
        ctx.drawImage(image, 27, 12, 75, 75);
        ctx.restore();
    
        let img = canvas.toBuffer('image/png')
        message.reply({ content: ``,files:[img]})
      },
    };

    /**
     * roundedImage()
     * @property {ctx} ctx Canvas ctx
     * @param {object} ctx Canvas ctx 
     * @param {number|bigint} x Number
     * @param {number|bigint} y Number
     * @param {number|bigint} width Number
     * @param {number|bigint} height Number
     * @param {number|boolean} radius Number Or Boolean
     * @returns {roundedImage}
     * @example roundedImage(ctx,50,50,500,300,10)
     * @example roundedImage(ctx,50,50,500,300,true)
     */
  function roundedImage(ctx,x, y, width, height, radius) {
    if (radius === true) radius = 5;
    if (!radius || typeof radius !== "number") radius = 0;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    return ctx;
}

 