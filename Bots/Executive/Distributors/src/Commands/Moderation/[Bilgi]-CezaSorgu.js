const { PermissionsBitField, MessageEmbed, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const emojis = require("../../../../src/configs/emojis.json")
const penals = require("../../../../src/schemas/penals")
const cezapuan = require("../../../../src/schemas/cezapuan")
const ceza = require("../../../../src/schemas/ceza")
moment.locale("tr");
const client = global.bot; 
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["cezasorgu","sorgu","ceza"],
    name: "cezasorgu",
    help: "cezasorgu <Ceza-ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    if (isNaN(args[0])) return message.channel.send({ content:"Ceza ID'si bir sayı olmalıdır!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const data = await penals.findOne({ guildID: message.guild.id, id: args[0] });
    if (!data) return message.channel.send({ content:`${args[0]} ID'li bir ceza bulunamadı!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: data.userID });
    const cezapuanData = await cezapuan.findOne({ userID: data.userID });
    var cezasayı = `${cezapuanData ? cezapuanData.cezapuan : 0}`

    let durum;
    if(cezasayı < 5) durum = "Çok Güvenli";
    if(cezasayı >= 5 && cezasayı < 20) durum = "Güvenli";
    if(cezasayı >= 20 && cezasayı < 30) durum = "Şüpheli";
    if(cezasayı >= 30 && cezasayı < 40) durum = "Tehlikeli";
    if(cezasayı >= 50) durum = "Çok Tehlikeli";

    const xd = new EmbedBuilder()
.setDescription(`
${client.emojis.cache.find(x => x.name === "ramal_yildizsarii")} ${client.users.cache.get(data.userID)} **Adlı Kullanıcının Cezalı Bilgisi**

\`\`\`cs
Ceza ID: ${data.id}
Ceza Durumu: ${data.active ? `🟢 [Aktif]` : `🔴 [Bitti]`}
Cezalandıran Yetkili: ${client.users.cache.get(data.staff).tag}
Ceza İşlem: ${data.type}
Ceza Sebep: ${data.reason}
Ceza Bitiş Tarihi: ${data.finishDate ? `${moment(data.finishDate).format("LLL")}` : "Bulunmamaktadır."}
\`\`\`
Toplamda  [${cezaData ? cezaData.ceza.length : 0}] Ceza Almış.
`)
    message.channel.send({ embeds: [xd] });
  },
};
