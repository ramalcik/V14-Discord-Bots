const gorev = require("../../../../src/schemas/invite");
const kayitg = require("../../../../src/schemas/kayitgorev");
const mesaj = require("../../../../src/schemas/mesajgorev");
const tagli = require("../../../../src/schemas/taggorev");
const coin = require("../../../../src/schemas/coin");
const conf = require("../../../../src/configs/sunucuayar.json")
const moment = require("moment");
require("moment-duration-format");
const { Muhabbet, gulucuk, mesaj2, galp, staff ,rewards , fill, empty, fillStart, emptyEnd, fillEnd, red } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
const { PermissionsBitField } = require("discord.js");

module.exports = {
    conf: {
      aliases: ["görev", "gorev"],
      name: "görev",
      help: "görev",
      category: "yetkili",
    },
  
    run: async (client, message, args, embed, prefix) => {
        let kanallar = ayar.KomutKullanımKanalİsim;
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)
    const gorevData = await gorev.findOne({ guildID: message.guild.id, userID: member.user.id });

    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });

    const maxValuee = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
    currentRank = currentRank[currentRank.length-1];

    const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
    `${currentRank ?`
    ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rolündesiniz. ${Array.isArray(maxValuee.role) ? maxValuee.role.length > 1 ? maxValuee.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValuee.role.map(x => `<@&${x}>`).slice(-1) : maxValuee.role.map(x => `<@&${x}>`).join("") : `<@&${maxValuee.role}>`} rolüne ulaşmak için \`${maxValuee.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
    Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValuee.role) ? maxValuee.role.length > 1 ? maxValuee.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValuee.role.map(x => `<@&${x}>`).slice(-1) : maxValuee.role.map(x => `<@&${x}>`).join("") : `<@&${maxValuee.role}>`} rolüne ulaşmak için \`${maxValuee.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""
    

    const total = gorevData ? gorevData.invite : 0;
    const maxValue = "10"
    const coinStatus1 = client.ranks.length > 0 ?
`**İnvite Görev Durumu :** 
${staff} ${progressBar(gorevData ? gorevData.invite : 0, 10, 10)} \`${total} (${total}/10)\` 
` : "";
          //
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: member.user.id });
    const kayittotal = kayitgData ? kayitgData.kayit : 0;
    const maxValue2 = "10"
    const coinStatus2 = client.ranks.length > 0 ?
`**Kayıt Görev Durumu :**  
${Muhabbet} ${progressBar(kayitgData ? kayitgData.kayit : 0, 10, 10)} \`${kayittotal} (${kayittotal}/10)\`
` : "";
          //
    const mesajData = await mesaj.findOne({ guildID: message.guild.id, userID: member.user.id });
    const mesajtotal = mesajData ? mesajData.mesaj : 0;
    const maxValue3 = "10"
    const coinStatus3 = client.ranks.length > 0 ?
`**Mesaj Görev Durumu :**  
${mesaj2} ${progressBar(mesajData ? mesajData.mesaj : 0, 500, 5)} \`${mesajtotal} (${mesajtotal}/500)\`
` : "";
          //
    const tagData = await tagli.findOne({ guildID: message.guild.id, userID: member.user.id });
    const tagTotal = tagData ? tagData.tagli : 0;
    const maxValue4 = "5"
    const coinStatus4 = client.ranks.length > 0 ?
`**Taglı Üye Durumu :**  
${galp} ${progressBar(tagData ? tagData.tagli : 0, 5, 5)} \`${tagTotal} (${tagTotal}/5)\`
` : "";


message.channel.send({ embeds: [embed.setDescription(`
${member.toString()}, (${member.roles.highest}) rolüne ait görevlerin aşağıda belirtilmiştir. Görevler tamamlandığında tamamladığın görevlerin ödüllerini almak için \`.görevlerim ödül\` komutu ile alabilirsiniz.  

Kalan Süre: \`${moment.duration(moment().endOf('day').valueOf() - Date.now()).format("H [saat], m [dakika] s [saniye]")}\`
5 görevi tamamlamak sana toplam \`120 Coin\` verecektir!
          
${coinStatus1} **Ödül :** ${rewards} \`30\` Coin\n
${coinStatus2} **Ödül :** ${rewards} \`30\` Coin\n
${coinStatus3} **Ödül :** ${rewards} \`30\` Coin\n
${coinStatus4} **Ödül :** ${rewards} \`30\` Coin
${coinStatus}
`)]})
}
};
function progressBar(value, maxValue, size) {
    const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
    const emptyProgress = size - progress > 0 ? size - progress : 0;
    if (progress === maxValue) return "Tamamlandı!";

    const progressText = fill.repeat(progress);
    const emptyProgressText = empty.repeat(emptyProgress);
    
    return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
    
};
