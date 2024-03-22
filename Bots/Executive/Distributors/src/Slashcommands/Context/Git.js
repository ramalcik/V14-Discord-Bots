const { ApplicationCommandType } = require('discord-api-types/v10');
const { PermissionsBitField, ButtonStyle, ComponentType, ContextMenuCommandBuilder, hyperlink, EmbedBuilder, ActionRowBuilder, ButtonBuilder, IntegrationApplication } = require("discord.js");
const allah = require("../../../../../../config.json");
const ayar = require("../../../../src/configs/sunucuayar.json");
const { green, red } = require("../../../../src/configs/emojis.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('Git')
	.setType(ApplicationCommandType.User),
		
  async execute(interaction, client) {
let member = client.guilds.cache.get(allah.GuildID).members.cache.get(interaction.targetId);
if (!member) return;

if (!interaction.member.voice.channel) {
    return interaction.reply({ content: "Bir ses kanalında olmalısın!", ephemeral: true });
  }
  if (!member.voice.channel) {
    return interaction.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!", ephemeral: true });
  }
  if (interaction.member.voice.channel === member.voice.channel) {
    return interaction.reply({ content: "Zaten aynı kanaldasınız!", ephemeral: true });
  }

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("onay")
.setLabel("Kabul Et")
.setStyle(ButtonStyle.Success)
.setEmoji("915754671728132126"),

new ButtonBuilder()
.setCustomId("red")
.setLabel("Reddet")
.setStyle(ButtonStyle.Danger)
.setEmoji("920412153712889877"),
);


const row2 = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setCustomId("onayy")
.setLabel("İşlem Başarılı")
.setStyle(ButtonStyle.Success)
.setDisabled(true),
);

const row3 = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setCustomId("redd")
.setLabel("İşlem Başarısız")
.setStyle(ButtonStyle.Danger)
.setDisabled(true),
);

if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    interaction.member.voice.setChannel(member.voice.channel.id)
    interaction.reply({ embeds: [new EmbedBuilder().setThumbnail(interaction.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${interaction.user}, ${member} kişisini yanınıza gittiniz.`)], ephemeral: true });
    const log = new EmbedBuilder()
    .setDescription(`
    Bir Transport işlemi gerçekleşti.

    Odaya Giden Kullanıcı: ${member} - \`${member.id}\`
    Odasına Gidilen Yetkili: ${interaction.user} - \`${interaction.user.id}\`
    `)
    .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
    client.channels.cache.find(x => x.name == "voice_log").wsend({ embeds: [log] });
} else {    

let papaz = new EmbedBuilder()
.setDescription(`${member}, ${interaction.user} \`${member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
.setFooter({ text: `30 saniye içerisinde işlem iptal edilecektir.`})
.setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })

let msg = await interaction.reply({ content: `${member}`, embeds: [papaz], components: [row] })

var filter = button => button.user.id === member.user.id;

let collector = await interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 30000 })

collector.on("collect", async (button) => {

if(button.customId === "onay") {
await button.deferUpdate();

const embeds = new EmbedBuilder() 
.setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true })})
.setTimestamp()
.setDescription(`${interaction.user}, ${member} kişisinin yanına başarıyla gittiniz.`)

interaction.member.voice.setChannel(member.voice.channel.id)
await interaction.deleteReply();
await interaction.followUp({ embeds: [embeds], components: [row2], ephemeral: true })

}

if(button.customId === "red") {
await button.deferUpdate();

const embedss = new EmbedBuilder() 
.setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true })})
.setTimestamp()
.setDescription(`${interaction.user}, ${member} yanına gitme işlemi iptal edildi.`)
await interaction.deleteReply();
await interaction.followUp({ embeds: [embedss], components: [row3], ephemeral: true })
  }
});

}
}
};