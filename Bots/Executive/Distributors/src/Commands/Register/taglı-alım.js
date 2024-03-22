const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const { red , green } = require("../../../../src/configs/emojis.json")
const registerData  = require("../../../../src/schemas/registerStats");
const Database  = require("../../../../src/schemas/WelcomeMode");
const children = require("child_process");

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args) => {  
    let taglialim = "./src/sesler/taglialim.mp3"

    let data = await registerData.findOne({ guildID: allah.GuildID })
    if(!data) new registerData({guildID: allah.GuildID, tagMode: false}).save();

    let ac = new ButtonBuilder()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("915754671728132126");

    let kapa = new ButtonBuilder()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("920412153712889877");

    if (data && data.tagMode === true) {
      ac.setStyle(ButtonStyle.Success).setDisabled(true);
    } else {
      ac.setStyle(ButtonStyle.Success);
    }

    if (data && data.tagMode === false) {
      kapa.setStyle(ButtonStyle.Danger).setDisabled(true);
    } else {
      kapa.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
    .addComponents([ ac, kapa ]);
  
  
    let papaz = new EmbedBuilder()  
    .setDescription(`${message.author} Taglı Modunu Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.`)
    .setFooter({ text: `Kapalı olan buton şuanki taglı modunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [papaz], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: allah.GuildID })
      data.tagMode = true;
      data.save();
      msg.edit({ content: `${green} Taglı Alım modu başarıyla **Aktif** edildi!`, embeds: [], components: [] });
      if(data && data.SesMod === taglialim) return msg.edit({ content: `Zaten ses modu \` Taglı Alım \` olarak ayarlı`, components: [] });
        await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: taglialim}, { upsert: true })
        children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
      }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: allah.GuildID })
      data.tagMode = false;
      data.save();
      msg.edit({ content: `${green} Taglı Alım modu başarıyla **Deaktif** edildi!`, embeds: [], components: [] });
    }

  })
}
}
