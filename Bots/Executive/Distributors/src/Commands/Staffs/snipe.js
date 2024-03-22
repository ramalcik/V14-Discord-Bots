const { PermissionsBitField, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const snipe = require("../../../../src/schemas/snipe");
const { green, red } = require("../../../../src/configs/emojis.json");
const emojis = require("../../../../../../emojiName.json")
module.exports = {
  conf: {
    aliases: ["snipe", "sn"],
    name: "snipe",
    help: "snipe",
    category: "yetkili",
  },

  run: async (client, message, args) => {
    if (!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      message.react(message.guild.emojiGöster(emojis.red))
      return
    }
    const hembed = new EmbedBuilder().setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
    message.react(message.guild.emojiGöster(emojis.green))

    const data = await snipe.find({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data || data.length === 0) {
      message.react(message.guild.emojiGöster(emojis.red))
      message.reply({ embeds: [new EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setThumbnail()
        .setDescription(`Bu kanalda silinmiş bir mesaj bulunmuyor`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    const pageSize = 10; // Her sayfada gösterilecek maksimum mesaj sayısı
    const pages = Math.ceil(data.length / pageSize);
    const selectMenus = [];

    for (let i = 0; i < pages; i++) {
      const startIndex = i * pageSize;
      const endIndex = Math.min(startIndex + pageSize, data.length);
      const options = data.slice(startIndex, endIndex).map((msg, index) => ({
        label: `Mesaj ${startIndex + index + 1}`,
        description: msg.messageContent.length > 50 ? `${msg.messageContent.slice(0, 50)}...` : msg.messageContent,
        value: `${msg.deletedDate}`
      }));

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`snipe_select_${i}`)
        .setPlaceholder('Bir mesaj seçin...')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(options);

      selectMenus.push(selectMenu);
    }

    const actionRows = selectMenus.map(selectMenu => new ActionRowBuilder().addComponents(selectMenu));

    message.channel.send({ content: 'Birden fazla silinen mesaj arasından seçim yapın:', components: actionRows });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return;

      const value = interaction.values[0];
      const selectedMessage = data.find(msg => `${msg.deletedDate}` === value);

      const author = await client.users.fetch(selectedMessage.userID); // degisiklik yapildi.
hembed.setDescription(`
\` • \` Mesaj Sahibi: <@${selectedMessage.userID}> - [\`${selectedMessage.userID}\`]
\` • \` Mesajın Yazılma Tarihi: <t:${Math.floor(selectedMessage.createdDate / 1000)}:R>
\` • \` Mesajın Silinme Tarihi: <t:${Math.floor(selectedMessage.deletedDate / 1000)}:R>

\`\`\`fix\n${selectedMessage.messageContent ? `${selectedMessage.messageContent}` : ""}\`\`\``);

      interaction.update({ embeds: [hembed] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    });
  },
};
