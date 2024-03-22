const { EmbedBuilder } = require("discord.js");
const özelPerms = require("../../../../src/schemas/talentPerms");
const { green, red } = require("../../../../src/configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["özelkomut"],
    name: "özelkomut",
    help: "özelkomut [ekle, kaldır, liste]",
    category: "yönetim",
  },

  run: async (client, message, args) => {  
    if (!args[0]) return message.channel.send({ content: `${red} Bir argüman belirtmelisin. (ekle/kaldır/liste)`}).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
    if (args[0] === "oluştur" || args[0] === "ekle") {
        let komutAd = args[1];
        if (!komutAd) return message.reply({ content: `${red} Bir komut adı belirlemelisin.` }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
        if (!args[2] && !args[3]) return message.channel.send({ content: `${red} Bir yetkili ve verilecek rolü belirlemelisin. \` Yetkili Rol - Verilecek Rol \`` }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});

        let yetkiliRol = args[2].split(" ").map(rol => message.guild.roles.cache.get(rol.replace("<@&", "").replace(">", "")));
        let roller = args[3].split(" ").map(rol => message.guild.roles.cache.get(rol.replace("<@&", "").replace(">", "")));

        let kanalcık = args[4];
        if (!kanalcık) return message.reply({ content: `${red} Bir kanal ismi belirlemelisin. Örnek: vip_log` }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});

        let talents = await özelPerms.findOne({ guildID: message.guild.id, komutAd: komutAd });
        if (talents) return message.reply({ content: `${red} Bu isimde bir komut zaten mevcut.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
        let newData = özelPerms({ guildID: message.guild.id, komutAd: komutAd, YetkiliRol: yetkiliRol, verilecekRol: roller, kullanımKanal: kanalcık }); newData.save();
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${green} \`${komutAd}\` adlı komut başarılı bir şekilde oluşturuldu.\n\nKomut İzni Olan Rol(ler): ${yetkiliRol}\nVerilecek Rol(ler): ${roller}\nKomut Log Kanal: ${kanalcık}`)] });
    } else if (args[0] === "liste" || args[0] === "list" || args[0] === "incele" || args[0] === "bilgi") {
        let data = await özelPerms.find({}); let data2 = await özelPerms.findOne({ guildID: message.guild.id, komutAd: args[1] });
        if (!data2) return message.reply({ embeds: [new EmbedBuilder().setDescription(`${red}  Lütfen bir komut adı girerek tekrar deneyiniz.\n\n(Komutlar: \`${data.map(x => x.komutAd).join(" - ")}\`) `)] });
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Komut adı : ${data2.komutAd}\nRol : ${data2.verilecekRol.length > 0 ? data2.verilecekRol.map(x => `<@&${x}>`) : "Her hangi bir rol yok."}\nYetkililer : ${data2.YetkiliRol.length > 0 ? data2.YetkiliRol.map(x => `<@&${x}>`) : "Her hangi bir rol yok."}\nKomut Log Kanal: ${data2.kullanımKanal ? data2.kullanımKanal : `Her hangi bir kanal yok.`} `)] })
    } else if (args[0] === "sil" || args[0] === "kaldır") {
        let data2 = await özelPerms.findOne({ guildID: message.guild.id, komutAd: args[1] })
        if (!data2) return message.reply({ content: `${red} Hangi komutu silmek istiyorsun?` }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
        await özelPerms.deleteOne({ guildID: message.guild.id, komutAd: args[1] })
        await message.channel.send({ content: `${green} \`${args[1]}\` isimli komut başarılı bir şekilde silindi.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
    }
  }
};