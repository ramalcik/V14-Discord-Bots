const { EmbedBuilder, MessageButton, MessageActionRow } = require("discord.js")
const Discord = require("discord.js")
const emoji = require("../../../../src/configs/emojis.json")
const { green, red, } = require("../../../../src/configs/emojis.json")
const conf = require("../../../../src/configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: ["admin","yöneticiler"],
    name: "yöneticilist",
    help: "yöneticilist",
    category: "sahip",
    owner: true,
  },


  run: async (client, message, args) => {

        var list = [] 
        var i = 1
        await message.guild.members.cache.forEach(async m => {
            if(!m.permissions.has("ADMINISTRATOR")) return 
            await list.push(`<@${m.id}>`)
        });

        message.react(green)
        const listEmbed = new EmbedBuilder()
.setAuthor({ name: `${message.guild.name} (Yönetici Listesi)`,iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`Aşağıda Yönetici Yetkisine Sahip Kullanıcılar Ve Botlar Listelenmektedir. \n\n${list.map(list => `\`[${i++}.]\` ${list}`).join("\n")}`) 
        return message.reply({ embeds: [listEmbed]})

    }
}