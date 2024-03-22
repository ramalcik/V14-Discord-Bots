const coin = require("../../../../src/schemas/coin");
const conf = require("../../../../src/configs/sunucuayar.json")
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  conf: {
    aliases: [],
    name: "topyetki",
    help: "topyetki",
    category: "yetkili",
  }, 
  
  run: async (client, message, args, embed) => { 
    const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });
    let coinSum = 0;
    const coinUsers = coinData.splice(0, 20).map((x, index) => {
    coinSum += x.coin;
    return `\` ${index+1} \` <@${x.userID}> \`${Number(x.coin).toLocaleString()} Yetki Puanı\``
    }).join(`\n`);
      
       
const embeds = new EmbedBuilder()
.setDescription(`
🎉 Aşağıda **${message.guild.name}** sunucusunun genel yetkili sıralaması listelenmektedir.
              
${coinUsers.length > 0 ? coinUsers : "Veri Bulunmuyor."}
              
Genel Yetkili sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

message.channel.send({ embeds: [embeds] })   
}}