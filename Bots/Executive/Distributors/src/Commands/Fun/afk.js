const afk = require("../../../../src/schemas/afk");
const { green, red} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["afk"],
      name: "afk",
      help: "afk <Sebep>",
      category: "kullanıcı",
    },
  
    
run: async (client, message, args, embed, prefix) => {
  let kanallar = ayar.KomutKullanımKanalİsim;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
const reason = args.join(" ") || "Belirtilmedi!";
await afk.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { reason, date: Date.now() } }, { upsert: true });
message.react(green)
message.reply({ embeds: [new EmbedBuilder()
  .setThumbnail()
  .setDescription(`Başarıyla afk moduna girdiniz! Bir şey yazana kadar [AFK] kalacaksınız.`)
  ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`);
}
  };
  
