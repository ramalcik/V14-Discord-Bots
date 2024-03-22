const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { green , red } = require("../../../../src/configs/emojis.json")
const ceza = require("../../../../src/schemas/ceza");
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["topceza","tc"],
    name: "topceza",
    help: "topceza",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    let cezaTop = await ceza.find({ guildID: message.guild.id }).sort({ top: -1 });
    if (!cezaTop.length) 
    {
    
    const redemoji = client.emojis.cache.find(x => x.name === "red");
    message.react(redemoji)
    message.reply({ embeds: [new EmbedBuilder()
     // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${client.emojis.cache.find(x => x.name === "red")} Herhangi bir ceza verisi bulunamadı!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    let list = cezaTop
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, i) => `${x.userID === message.author.id ? `\` ${i + 1} \` <@${x.userID}> Toplam **${x.top}** **(Sen)**` : `\` ${i + 1} \` <@${x.userID}> Toplam **${x.top}**`}`)
    .join("\n");
    const greenEmoji = client.emojis.cache.find(x => x.name === "green");
    message.react(greenEmoji)
    message.channel.send({ embeds: [embed.setDescription(list)] });

},
};


