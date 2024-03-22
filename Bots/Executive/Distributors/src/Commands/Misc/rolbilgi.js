const { red, green } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
const { MessageEmbed, PermissionsBitField } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["rolbilgi","role"],
    name: "rolbilgi",
    help: "rolbilgi  <@Role/ID>",
    category: "yönetim",
  },
  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
     if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
   if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ content: `${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
 
  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if (!args[0]) return message.reply({ content:"Bir rol etiketle ve tekrardan dene!"})
if (!role) return message.reply({ content:"Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene."})
let sayı = role.members.size
if (sayı > 200) return message.reply({ content:`${role} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`})
let üyeler = role.members.map(x => `<@${x.id}> - (\`${x.id}\`) `)

message.reply({ embeds: [embed.setDescription(`
- ${role} rol bilgileri;
- Rol Kişi Sayısı: \`${sayı}\`
─────────────────
- Roldeki Kişiler: 
${üyeler.join("\n")}
`)]})
}
}
