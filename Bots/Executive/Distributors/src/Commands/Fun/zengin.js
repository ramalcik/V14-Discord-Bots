const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["boost"],
      name: "zengin",
      help: "zengin",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {
let kanallar = ayar.KomutKullanımKanalİsim;
if (!kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      
    let booster = conf.boosterRolu || undefined;
    if(!booster) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Booster Rolu Bulunamadı`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    if(!message.member.roles.cache.has(booster)) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
    if(!isim) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Geçerli bir isim belirtmelisin`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    yazilacakIsim = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    uye.setNickname(`${yazilacakIsim}`).catch() 
    message.react(green)
let papaz = new EmbedBuilder()
.setDescription(`${green} Başarıyla ismini \`${yazilacakIsim}\` olarak değiştirdim`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
message.reply({ embeds: [papaz] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
},
  };
  
  
