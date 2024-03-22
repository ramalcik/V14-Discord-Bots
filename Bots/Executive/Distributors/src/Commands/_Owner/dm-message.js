const Discord = require("discord.js");
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");
const { EmbedBuilder } = require("discord.js");


module.exports = {
    conf: {
      aliases: ["dmmesaj","dmat"],
      name: "dmmesaj",
      help: "dmmesaj",
      category: "sahip",
      owner: true,
    },
  
    run: async (client, message, args) => {


        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let dmkisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!dmkisi) return message.channel.send(':x: **DM Atacağın Kişiyi Seçmelisin**');
    let dm = args.slice(1).join(' ');
    if (!dm) return message.channel.send(':x: **DM Atcağım Yazıyı Unuttun!**');
    message.delete();
    const dmat = new Discord.EmbedBuilder()
    
    dmkisi.send(`${dm}`);
    message.channel.send("Mesaj Başarıyla Gönderildi").then(x => x.delete({timeout: 1000}));

    }
}