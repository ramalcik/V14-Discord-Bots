const Discord = require("discord.js");
const Canvas = require("@napi-rs/canvas");
let zaman = new Map();
const emojis = require('../../../../src/configs/emojis.json')
const moment = require('moment')
require('moment-duration-format')
const path = require('path');
moment.locale('tr')
module.exports = {
    conf: {
      aliases: ["tweet"],
      name: "tweet",
      help: "tweet [Text]",
     category: "User"     
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ["tweet", "tweet-chat","sikayet"]
  if (!kanallar.some((x) => message.channel.name.toLowerCase().includes(x))) return message.reply({content: `${message.guild.emojiGöster(emojis.no)} tweet kanallarında kullanabilirsiniz.`}).sil(15)
const text = args.join(" ")
const yazı = [] 
        if(text.length > 64) {
        let yarrak = text.slice(0, 64)
          yazı.push(`${yarrak}`)  
        } else {
          yazı.push(`${text}`)
        }
const isim = [] 
        if(message.member.displayName.length > 27) {
        let yarrak = message.member.displayName.slice(0, 27)
          isim.push(`${yarrak}`)  
        } else {
          isim.push(`${message.member.displayName}`)
        }
  const isimTag = [] 
  if(message.member.user.tag.length > 34 && message.member.user.globalName.length > 34) {
    let yarrak = message.member.user.tag.slice(0, 34) && message.member.user.globalName.slice(0, 34)
          isimTag.push(`${yarrak}`)  
        } else {
          isimTag.push(`${message.member.user.globalName ? message.member.user.globalName : message.member.user.tag}`)
        }
if(!text) return message.react(message.guild.emojiGöster(emojis.no))
if (zaman.get(message.author.id) >= 1) return message.reply("<@"+message.member+"> Bu komutu 15 dakika'da bir kullanabilirsin.").sil(15)
	  message.delete().catch(e => {})
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d")
    const imagePath = path.resolve(__dirname, "../../../../src/Assets/tweet.jpg");
    
    // Resmi yükleyin
    let bg = await Canvas.loadImage(imagePath);
    ctx.drawImage(bg, 0, 0, 700, 250)
    ctx.font = "75px 'Candara'"
    ctx.fillStyle = "#f0f0f0"
    const messageAuthor = await Canvas.loadImage(message.member.user.avatar == null && "https://cdn.discordapp.com/attachments/1214834069976780811/1217046306313469982/Picsart_23-06-26_15-30-29-413_1.png?ex=660299b3&is=65f024b3&hm=62c747408f853c982da47f590c9937c524fc5d968099c3e08e01b86cf73478be&" || message.member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(messageAuthor, 25, 25, 75, 75)
    ctx.font = '34px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${isim}`, canvas.width / 6, canvas.height / 5);
    ctx.font = '16px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${isimTag}`, canvas.width / 6, canvas.height / 3.25);
    ctx.font = '25px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${yazı}`, canvas.width / 25, canvas.height / 1.75);
    ctx.font = '20px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${message.guild.name}`, canvas.width / 1.20, canvas.height / 1.25);
    const messageGuild = await Canvas.loadImage(message.guild.iconURL({ format: "png" }) ? message.guild.iconURL({ format: "png" }) : "https://media.discordapp.net/attachments/1121836955001430017/1122866615072063508/Picsart_23-06-26_15-30-29-413.png?ex=65e5bf06&is=65d34a06&hm=ad4431c79d6f35f19cd31b67a4fe00d4f2e08f98a3694b98deeabdf5cb69735a&")
    ctx.drawImage(messageGuild, 540, 180, 25, 25)
    ctx.font = '16px "Candara"',
    ctx.fillStyle = '#09090a';
    ctx.fillText(`${moment(Date.parse(new Date())).format("LLL")}`, canvas.width / 1.23, canvas.height / 1.05);

let attachment = new Discord.AttachmentBuilder(await canvas.encode('png'), {name: "tweet.jpg"})  

message.channel.send({files: [attachment]})
if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {   
 zaman.set(message.author.id, (zaman.get(message.author.id) || 1));
	setTimeout(() => {
		zaman.delete(message.author.id)
	}, 1000 * 60 * 15 * 1)
  }
   }
  } 