const { PermissionsBitField, Discord, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const giveaway = require('../../../../src/schemas/giveaway.js')
const { green, red, cekilis } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
const ms = require("ms")

module.exports = {
  conf: {
    aliases: ["reroll", "greroll"],
    name: "greroll",
    help: "greroll [Mesaj ID]",
    category: "sahip"
  },

  run: async (client, message, args) => {
    if (
        !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) &&
        !message.member.roles.cache.some(r => r.name === "Sponsor")
      ) {
        return message.reply({ content: `${red} Çekiliş başlatmak için Sponsor yada Mesaj Yönet yetkisine sahip olmalısın.`});
      }

      let mesaj = args[0]

      if (isNaN(mesaj)) return message.reply({ content: `${red} Lütfen komutu doğru kullanın! \`.greroll [Mesaj-ID]\`` })
      let data = await giveaway.findOne({ messageID: mesaj });
      if (!data) return message.reply({ content: `${red} Mesaj ID'sinde datada veri bulunamadı.` })
      let arr = data.katilan;
      let random = arr[Math.floor(Math.random() * arr.length)]

message.channel.send({ content: `<@${random}> tebrikler kazandın!` })
message.channel.send({
embeds: [
new EmbedBuilder()
.setTitle(`KAZANAN TEKRAR SEÇİLDİ`)
.setFooter({ text : `Katılımcı Sayısı: ${arr.length}` })
.setDescription(`
${cekilis} Çekiliş kazananı yeniden seçildi!
Çekilişi Tekrarlatan : ${message.author}
  
Kazanan Katılımcı : <@${random}>
`)], components: []
      })

  },
};