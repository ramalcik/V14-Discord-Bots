const { green, red } = require("../../../../src/configs/emojis.json")
const ekipSchema = require('../../../../src/schemas/ekip');
const moment = require("moment")
const Guild = require("../../../../src/configs/sunucuayar.json");
const { MessageFlags, PermissionsBitField } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["ekip"],
    name: "ekip",
    help: "ekip [ekle/sil] [kontrol] / [bilgi/liste]",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const crews = await ekipSchema.findOne({ guildID: message.guild.id })

    let secim = args[0];
    if (!secim) {
      message.channel.send({
        embeds: [embed.setDescription(`
**ekip:** Yardım menüsünü görürsünüz. 
**ekip ekle** Sunucuya yeni bir ekip eklersiniz.
**ekip liste** Sunucuda bulunan tüm ekipleri listelersiniz.
**ekip bilgi** Belirtilen ekibin bilgilerini görürsünüz.
**ekip kontrol** Belirtilen ekibin anlık aktifliklerine bakarsınız.
**ekip sil** Sunucuda olan bir ekibi çıkartırsınız.
`)]
      }).then((e) => setTimeout(() => { e.delete(); }, 10000));
      return
    }
    let tag = args[1];
    let sayitagi = args[2];
    let yönetici = message.mentions.members.first() || message.guild.members.cache.get(args[3]);



    if (secim === "ekle") {
      if (!tag) {
        message.channel.send({ embeds: [embed.setDescription(`Geçerli Bir kullanım şekli belirtmelisin. **!ekip ekle Tag - Etiket tagı - Ekip Yöneticisi** \n Örnek: !ekip ekle papaz 0001 @papaz/papaz)`)] })
        return
      }
      if (!sayitagi || isNaN(sayitagi)) {
        message.channel.send({ embeds: [embed.setDescription(`Etiket tagını eklemeyi unuttun **!ekip ekle Tag - Etiket tagı - Ekip Yöneticisi** \n Örnek: !ekip ekle ${Guild.tag} 0001 `)] })
        return
      }
      if (!yönetici) {
        message.channel.send({ embeds: [embed.setDescription(`Ekip Yöneticisi Eklemeyi Unuttun. **!ekip ekle Tag - Etiket tagı - Ekip Yöneticisi** \n Örnek: !ekip ekle ${Guild.tag} 0001 @papaz/papaz`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return
      }
      message.guild.roles.create({

        name: `${tag} #${sayitagi}`,
        color: "Random",
        mentionable: false,
        reason: "Ekip Rolü"
      }).then(async (role) => {
        await ekipSchema.findOneAndUpdate({ guildID: role.guild.id }, { $push: { crewHouse: { EkipAdı: tag, Sayısı: sayitagi || "Yok", Yöneticisi: yönetici.id, tarih: moment(Date.now()).format("LLL"), EkipRolu: role.id } } }, { upsert: true });
        message.channel.send({
          embeds: [embed.setDescription(`
**Ekip başarı ile oluşturuldu! (${tag}, #${sayitagi}, ${yönetici}.)**
**Ekip Bilgileri**
Ekip Tagı:** ${tag}**
Ekip Etiket Tagı:** ${sayitagi}**
Ekip Sorumlusu-Yöneticisi:** ${yönetici}**
Ekibin Sunucuya Katıldığı Tarih:** ${moment(Date.now()).format("LLL")}**
Ekip Rolü** <@&${role.id}>**   
**Ekip tagındaki üyeler:**
Tagda (${tag}) bulunan kişi sayısı:** ${message.guild.members.cache.filter(m => m.user.tag.toLowerCase().includes(tag)).size}** kişi!
Etiket tagında (${sayitagi}) bulunan kişi sayısı** ${message.guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size}** kişi!
        
Toplam tag ve etiket tagında bulunan **${message.guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size + message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size}** kişi tespit edildi. Kişilere <@&${role.id}> Rolü dağıtılıyor!
`)]
        })
        message.guild.members.cache.forEach(qwe => {
          if (qwe.user.username.includes(tag)) {
            qwe.roles.add(role.id)
          }
        })
        message.guild.members.cache.forEach(qwe => {
          if (qwe.user.discriminator.includes(sayitagi)) {
            qwe.roles.add(role.id)
          }
        })
      })
    }
    if (secim === "liste") {
      if (crews.crewHouse === null || crews === null) return message.reply({ content: `Sunucuda veritabanına kaydedilmiş bir ekip yok.` });
      let crewPage = crews.crewHouse.length > 0 ? crews.crewHouse.map((value) => `
**Ekip :** <@&${value.EkipRolu}>
**Ekip Kişi Sayısı :** ${message.guild.members.cache.filter(b => b.roles.cache.has(value.EkipRolu)).size}
**Ekip Kurucusu:** <@!${value.Yöneticisi}>
**Sunucumuza Katıldığı Tarih: **${value.tarih}
**Ekip Ses Aktifliği:** ${message.guild.members.cache.filter(s => s.user.discriminator.includes(value.Sayısı)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(value.EkipAdı)).filter(s => s.voice.channel).size || 0}
**─────────────────────────────────**
`).join("\n") : `Sunucumuzda henüz bir ekip yok`;
      message.channel.send({ embeds: [embed.setFooter(`Sunucumuzda toplam ailemize katılmış ${crews.crewHouse.length} ekip var!`).setAuthor({ name: `${message.guild.name}`, iconURL: message.author.avatarURL({ dynamic: true })}).setDescription(`${crewPage}`)] })
    }
    if (secim === "bilgi") {
      if (!tag) {
        message.channel.send({ embeds: [embed.setDescription("Sunucumuz da olan ekibin tagını belirtmelisin")] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return
      }
      const crews = await ekipSchema.findOne({ guildID: message.guild.id })
      const ekipler = crews.crewHouse.filter(a => a.EkipAdı == tag).map(a => `              
Aşağıda **${a.EkipAdı}** ekibinin tüm bilgileri gösteriliyor!
**Ekibin Tagı:** ${a.EkipAdı}
**Ekibin Sayı Tagı:** ${a.Sayısı}
**Ekibin Sorumlusu-Yöneticisi:** ${message.guild.members.cache.get(a.Yöneticisi) || message.guild.members.cache.get(a.Yöneticisi).user.tag}
**Ekibin Sunucuya Katılım Tarihi:** ${a.tarih}
**Ekibin Rolü:** <@&${a.EkipRolu}>`)
      if (!ekipler) {
        message.channel.send({ embeds: [embed.setDescription("Sunucumuz da olan ekibin tagını belirtmelisin")] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return
      }
      message.channel.send({ embeds: [embed.setDescription(`${ekipler}`)] })
    }
    if (secim === "kontrol") {
      if (!tag) {
        message.channel.send({ embeds: [embed.setDescription("Bir tag belirtmelisin.")] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return
      }
      const crews = await ekipSchema.findOne({ guildID: message.guild.id })
      const ekipler = crews.crewHouse.filter(a => a.EkipAdı == tag).map(a => `
Aşağıda **${a.EkipAdı}** Ekibinin Anlık Ses Aktiflikleri Ve Taglarındaki Üye Sayıları Gösteriliyor!

**Ekip Yöneticisi** ${message.guild.members.cache.get(a.Yöneticisi) || message.guild.members.cache.get(a.Yöneticisi).user.tag}
**Ekip Yöneticisi Ekibinin Başında mı?** ${message.guild.members.cache.get(a.Yöneticisi).voice.channelId ? "Yönetici Seste" : "Yönetici Seste Değil"}
**İsminde Tag (${a.EkipAdı}) Olup Seste Olan Kişi Sayısı:** ${message.guild.members.cache.filter(s => s.user.username.toLowerCase().includes(a.EkipAdı)).filter(s => s.voice.channel).size || "0"}
**İsminde Etiket (#${a.Sayısı}) Tag Olup Seste Olan Kişi Sayısı:** ${message.guild.members.cache.filter(s => s.user.discriminator.includes(a.Sayısı)).filter(s => s.voice.channel).size || "0"}              
**Toplam Ses Aktifliği: (${a.EkipAdı} - #${a.Sayısı})** ${message.guild.members.cache.filter(s => s.user.discriminator.includes(a.Sayısı)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(a.EkipAdı)).filter(s => s.voice.channel).size || 0}`)
      if (!ekipler) {
        message.channel.send({ embeds: [embed.setDescription("Sunucumuzda olan geçerli bir ekip belirtmelisin.")] })
        return
      }
      message.channel.send({ embeds: [embed.setDescription(`${ekipler}`)] })
    }

    if (secim === "sil") {
      if (!tag) {
        message.channel.send({ embeds: [embed.setDescription("Sunucumuzda olan geçerli bir ekip tagı belirtmelisin")] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return
      }
      const crews = await ekipSchema.findOne({ guildID: message.guild.id })

      const ekipler = crews.crewHouse.filter(a => a.EkipAdı == tag).map(e => e.EkipAdı)
      const amdin = crews.crewHouse.filter(a => a.EkipAdı == tag).map(e => e.Yöneticisi)
      const role = crews.crewHouse.filter(a => a.EkipAdı == tag).map(e => e.EkipRolu)
      if (!ekipler) {
        message.channel.send({ embeds: [embed.setDescription("Sunucumuzda olan geçerli bir ekip belirtmelisin.")] });
        return
      }
      await message.guild.members.cache.get(`${amdin}`); message.channel.send({ embeds: [embed.setDescription(`Kurucusu olduğunuz (**${ekipler}**) **${message.guild.name}** Sunucudan çıkartıldı. Emekleriniz için teşekkürler, hayatınızın geri kalanında başarılar.`)] }).catch(e => { })
      await message.channel.send({ embeds: [embed.setDescription(`**${ekipler}** **(${message.guild.members.cache.get(`${amdin}`)})** ekibi sunucumuzdan çıkartıldı.`)] }).catch(e => { })
      await message.guild.roles.cache.get(`${role}`).delete({ reason: "Ekip Olarak Sunucudan Çıkarıldı" }).catch(e => { })
      setTimeout(async () => { await ekipSchema.updateOne({ guildID: message.guild.id }, { $pull: { crewHouse: { EkipAdı: tag } } }) }, 4000);
    }
  }
}