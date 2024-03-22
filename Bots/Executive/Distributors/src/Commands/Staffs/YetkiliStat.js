const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const cezapuan = require("../../../../src/schemas/cezapuan");
const coin = require("../../../../src/schemas/coin");
const taggeds = require("../../../../src/schemas/taggeds");
const yetkis = require("../../../../src/schemas/yetkis");
const ceza = require("../../../../src/schemas/ceza");
const toplams = require("../../../../src/schemas/toplams");
const inviterSchema = require("../../../../src/schemas/inviter");
const {  rewards, miniicon, mesaj2, staff, galp ,Muhabbet ,star , fill, empty, fillstart, emptyend, fillEnd, red } = require("../../../../src/configs/emojis.json");
const { ButtonStyle, TeamMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const ayar = require("../../../../src/configs/ayarName.json");
const tasks = require("../../../../src/schemas/task")
const CameraStat = require("../../../../src/schemas/CameraStat")
const StreamerStat = require("../../../../src/schemas/StreamerStat")
const Seens = require("../../../../src/schemas/seens")
const emojis = require("../../../../../../emojiName.json")
const User = require("../../../../src/schemas/oryantasyon")
module.exports = {
  conf: {
    aliases: ["yme"],
    name: "YetkiliStat",
    help: "YetkiliStat",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(message.guild.emojiGöster(emojis.red))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(message.guild.emojiGöster(emojis.red))
    const mtask = await tasks.find({ guildID: message.guild.id, userID: member.user.id });
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });

    let kullArray = message.content.split(" ");
    let kullaniciId = kullArray.slice(1);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;

const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
      Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""


      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [Saat], m [Dakika]");
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [Saat], m [Dakika]");

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


let SonGörülme = await Seens.findOne({userID: member.id}) 
let sonMesaj = SonGörülme ? SonGörülme.lastMessage ? `<t:${String(SonGörülme.lastMessage).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
let sonSes = SonGörülme ? SonGörülme.lastVoice ?  `<t:${String(SonGörülme.lastVoice).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`

const yetkiFark = maxValue.coin - (coinData ? coinData.coin : 0);
const atlamaSuresiGun = Math.ceil(yetkiFark / 15); // Her 15 puan için 1 gün atlama süresi

// Atlayacak yetki yüzdesi
const atlayacakYetkiYuzdesi = (coinData ? coinData.coin : 0) / maxValue.coin * 100;

// Yetki atlaması bilgisini oluştur
const atlamaBilgisi = `${atlayacakYetkiYuzdesi.toFixed(2)}%`;
const atlamayuzdesi = `${atlamaSuresiGun}`;

const userData = await User.findOne({ discordId: member.id });

// Kullanıcının oryantasyonunu veren kişi varsa onun adını gösteriyoruz, yoksa belirtilen kullanıcının henüz oryantasyon almadığını belirtiyoruz
const orientationBy = userData ? userData.orientationBy : "Oryantasyon almadı.";

message.react(message.guild.emojiGöster(emojis.green))
const Ramal = new EmbedBuilder()
.setDescription(`${client.emojis.cache.find(x => x.name === "ramal_yildizsarii")} ${member.toString()}, **Ses İstatistiklerin Aşağıda Listeleniyor;**

${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Toplam Ses Saatin :  \` **${voiceDaily}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Haftalık Ses Saatin :  \` **${voiceWeekly}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Günlük Ses Saatin :  \` **${voiceDaily}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Son Seste Görülme Saatin :  \` ${sonSes} 

${client.emojis.cache.find(x => x.name === "ramal_yildizsarii")} ${member.toString()}, **Mesaj İstatistiklerin Aşağıda Listeleniyor;**

${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Toplam Mesaj Sayın : \` **${messageData ? messageData.topStat : 0}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Haftalık Mesaj Sayın : \` **${Number(messageWeekly).toLocaleString()}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Günlük Mesaj Sayın : \` **${Number(messageDaily).toLocaleString()}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Son Mesaj Atma Saatin :  \` ${sonMesaj}

${client.emojis.cache.find(x => x.name === "ramal_yildizsarii")} ${member.toString()}, **Genel Yetili/Yetki Yükseltim İstatistiklerin Aşağıda Listeleniyor;**

${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Oryantasyon Durumu :  \` <@${orientationBy}>
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Yetki İlerleme Durumu :  \` ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)}
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Yetki Yükselim Puanı :  \` [**${maxValue.coin}**] 
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Bulunan Yetkin :  \` ${message.member.roles.highest}
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Yükselinecek Yetkin :  \` ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`}
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` İlerleme Yüzdesi :  \` ilerleme durumun **${atlamaBilgisi}** yapıyorsun.
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Yetki Atlama Gün :  \` Böyle İlerlersen **${atlamayuzdesi}** gün sonra Yetki Atlarsın.

${client.emojis.cache.find(x => x.name === "ramal_yildizsarii")} ${member.toString()}, **Görev İstatistiklerin Aşağıda Listeleniyor;**

${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Görev Alma Tarihi :  \` Bulunamadı. 
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Görev Bitiş Tarih :  \` ${mtask.length ? mtask.filter((x) => x.active).map((x) => `**${moment.duration(x.finishDate - Date.now()).format("H [saat], m [dakika] s [saniye]")}**`).join("\n\n") : "Veri bulunamadı."}      
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Görev Puanı :  \` **35**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Görev Türü :  \` ${mtask.length ? mtask.filter((x) => x.active).map((x) => `${x.message}`).join("\n\n") : "Veri bulunamadı."}
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Görev İlerleme :  \` ${mtask.length === 0 ? "Görev Seçmelisin !" : mtask.filter((x) => x.active).map((x) => `\n${x.completedCount >= x.count ? `${message.guild.emojiGöster(emojis.yes)}` + " **Tamamlandı!**" : `${progressBar(x.completedCount, x.count, 8)} \`${x.type === "ses" || x.type === "yayin" || x.type == "camera" ? `${moment.duration(x.completedCount).format("H [saat], m [dk], s [sn]")} / ${moment.duration(x.count).format("H [saat], m [dk], s [sn]")}` : `${x.completedCount} / ${x.count}`}\``}`).join("\n\n")}

${client.emojis.cache.find(x => x.name === "ramal_yildizsarii")} ${member.toString()}, **Top Ses/Mesaj/Kamera/Yayın Sıralaması İstatistiklerin Aşağıda Listeleniyor;**

${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Top Ses Sıralaması :  \` **${sıralama2}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Top Mesaj Sıralaması :  \` **${sıralama}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Top Yayın Sıralaması :  \` **${sıralama3}**
${client.emojis.cache.find(x => x.name === "ramal_nokta")} \` Top Kamera Sıralaması :  \` **${sıralama4}**
`)

   

    let msg = await message.channel.send({ embeds: [Ramal], components: [] });

    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 99999999 })

    collector.on("collect", async (button) => {
      if(button.customId === "puan_detaylari") {
        await button.deferUpdate();

const puan = new EmbedBuilder()
.setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu aşağıda belirtilmiştir.`) 

.addFields({ name:`${star} **Puan Detayları:**`, value:`
${miniicon} Kayıt: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
${miniicon} Taglı: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
${miniicon} Davet: (\`Puan Etkisi: +${total*15}\`)
${miniicon} Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
${miniicon} Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240}\`)
${miniicon} Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
${miniicon} Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
`, inline: false },
{ name:`${star} **Net Puanlama Bilgisi**`, value:`
${miniicon} Kayıt işlemi yaparak, \`+5.5\` puan kazanırsın.
${miniicon} Taglı üye belirleyerek, \`+25\` puan kazanırsınız.
${miniicon} İnsanları davet ederek, \`+15\` puan kazanırsın.
${miniicon} İnsanları yetkili yaparak, \`+30\` puan kazanırsın.
${miniicon} Seste kalarak, ortalama olarak \`+4\` puan kazanırsınız.
${miniicon} Yazı yazarak, ortalama olarak, \`+2\` puan kazanırsınız.
`, inline: false },
{ name:`${star} **Puan Durumu:**`, value:`
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`${star} **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds : [puan],
  components : [row]
})
      
      }

  if(button.customId === "ceza_puan_detaylari") {
    await button.deferUpdate();
    const ceza = new EmbedBuilder()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu aşağıda belirtilmiştir.
`) 
.addFields({ name:`${star} **Ceza Kullanımı**`, value: `\`\`\`fix
( Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0} )\`\`\`
`, inline: false },
{ name:`${star} **Ceza Puan Detayları:**`, value: `
${miniicon} (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
${miniicon} (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
${miniicon} (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
${miniicon} (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
`, inline: false },
{ name:`${star} **Ceza Puan Detayları:**`, value:`
${miniicon} (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
${miniicon} (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
${miniicon} (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
${miniicon} (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
\`\`\`fix
Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (Toplam ${cezaData ? cezaData.ceza.length : 0})
\`\`\`
`, inline: false },
{ name:`${star} **Puan Durumu:**`, value: `
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`${star} **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds: [ceza],
  components : [row]
})  
    }

      if(button.customId === "iptal_button") {
        await button.deferUpdate();
        const iptal = new EmbedBuilder()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.
`)

.addFields(
  { name: "__**Toplam Ses**__",  value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
  { name: "__**Toplam Mesaj**__",  value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
  { name:"__**Toplam Kayıt**__",  value: `\`\`\`fix\n${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  )
  .addFields(
  { name: "__**Toplam Davet**__", value: `\`\`\`fix\n${inviterData ? `${total} regular`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Taglı**__", value: `\`\`\`fix\n${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Yetkili**__", value: `\`\`\`fix\n${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\n\`\`\``, inline: true }
  )
  
.addFields({ name:`${star} **Sesli Sohbet İstatistiği**`, value:`
${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${miniicon} Public Odalar: \`${await category(conf.publicParents)}\`
${miniicon} Secret Odalar: \`${await category(conf.privateParents)}\`
${miniicon} Alone Odalar: \`${await category(conf.aloneParents)}\`
${miniicon} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
${miniicon} Kayıt Odaları: \`${await category(conf.registerParents)}\`
`, inline: false },
{ name:`${star} **Mesaj İstatistiği**`, value:`
${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`
${miniicon} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${miniicon} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, inline: false });

   row.components[0].setDisabled(true) 
   row.components[1].setDisabled(true) 
   row.components[2].setDisabled(true)
   
    msg.edit({
      embeds: [iptal],
      components : [row]
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillstart+progressText+emptyProgressText+emptyend : fillstart+progressText+emptyProgressText+fillEnd;
};
