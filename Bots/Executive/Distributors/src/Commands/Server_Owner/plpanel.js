const { Discord,ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { basvuru,gorevli,yetkili } = require("../../../../src/configs/emojis.json")
let mongoose = require("mongoose");
const allah = require("../../../../../../config.json");
module.exports = {
    conf: {
      aliases: ["pl"],
      name: "panelsetup",
      help: "panelsetup",
      category: "sahip",
      owner: true,
    },

    run: async (client, message, args) => {

      if (message.guild === null) {
        return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if (!allah.owners.includes(message.author.id)) {
        return message.reply({ content: "Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
      } else {
    }
  


    const One = new ButtonBuilder().setLabel("Sorun Bildir").setCustomId("sorun").setStyle(ButtonStyle.Secondary).setEmoji(yetkili)
    const Two = new ButtonBuilder().setLabel("Öneri İlet").setCustomId("oneri").setStyle(ButtonStyle.Secondary).setEmoji(gorevli)
    const Four = new ButtonBuilder().setLabel("Yetkili Başvurusu").setCustomId("ybasvuru").setStyle(ButtonStyle.Secondary).setEmoji(basvuru)
    const row = new ActionRowBuilder()
    .addComponents([One , Two , Four ,])


let papaz = new EmbedBuilder()
.setDescription(`\`${message.guild.name}\` Sunucusunda Hangi Kategoriyi Kullanacaksanız Butona Tıklayarak bu İşlemi Gerçekleştirebilirisniz`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
let msg = await message.channel.send({ embeds: [papaz], components : [ row],})
  }
}
