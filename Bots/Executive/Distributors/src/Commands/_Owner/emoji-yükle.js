const { PermissionsBitField } = require('discord.js');
const Discord = require('discord.js');
const { green, kirmiziok } = require("../../../../src/configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["emoji","addemoji"],
    name: "emojiekle",
    help: "emojiekle <Emoji>",
    category: "sahip"
  },

  run: async (client, message, args) => {

 if(!message.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return message.reply({ content: `${message.author} bu komutu kullanabilmek için \`Emojileri Yönet\` Yetkisine sahip olmalısın.`, ephemeral: true });
 
 let emoji = args[0];
 let emojiName = args[1];
 if (!emoji) return message.reply({ content: `Bir Emoji belirtmelisin.`})
 if (!emojiName) return message.reply({ content: `Emojiye isim seçmelisin.`})

 const parseCustomEmoji = Discord.parseEmoji(emoji);
 if (parseCustomEmoji.id) {
   const emojiLink = `https://cdn.discordapp.com/emojis/${parseCustomEmoji.id}.${
     parseCustomEmoji.animated ? 'gif' : 'png'
   }`;
   const createEmoji = await message.guild.emojis.create({ attachment: emojiLink, name: emojiName || parseCustomEmoji.name});
   message.reply({
     content: `${createEmoji} emojisi sunucuya eklendi.`,
   });
 } else {
  message.reply({
     content: ':x: Emoji bulunamadı.',
     ephemeral: true,
   });
 }

    },
  };
