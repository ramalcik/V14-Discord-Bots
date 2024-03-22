const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");
const emoji = require("../../../../src/configs/emojis.json")
const { green, red } = require("../../../../src/configs/emojis.json")
const allah = require("../../../../../../config.json");
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["guardpanel", "gpanel"],
    name: "guardpanel",
  },
 
  run: async (client, message, args, embed, prefix) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
 

    if (message.guild === null) {
        return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if (!allah.owners.includes(message.author.id)) {
        return message.reply({ content: "Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
      } else {
    }

    message.react(green)
let papaz = new EmbedBuilder()
.setDescription(`\`\`\`Guard Yardım Panel \`\`\`
\`.cmd\` **yasakla/banned**
\`.güvenliliste\` **Güvenli Listeye Görürsün**
\`.gkaldır\` **Güvenliden Kaldırısın**
\`.gekle\` **Güvenli Liste Eklersin**
`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

message.reply({ embeds: [papaz] })

} 
}