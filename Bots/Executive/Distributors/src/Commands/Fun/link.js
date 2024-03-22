const ayar = require("../../../../src/configs/ayarName.json");
const { PermissionsBitField } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["link","url"],
      name: "link",
      help: "link",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {
 let kanallar = ayar.KomutKullanımKanalİsim;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

if(!message.guild.vanityURLCode) return message.reply({ content:"Sunucuda bir özel url yok."});
const url = await message.guild.fetchVanityData();

message.reply({ content: `discord.gg/${message.guild.vanityURLCode}\n\`Toplam kullanım:\` **${url.uses}**`})
},
  };
