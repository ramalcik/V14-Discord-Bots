const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../../../src/configs/sunucuayar.json")
const registerData  = require("../../../../src/schemas/registerStats");
const ayar = require("../../../../src/configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["registerkilit","regkilit"],
    name: "registerkilit",
    help: "registerkilit",
    category: "kayıt",
    owner: true,
  },

  run: async (client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
     message.channel.send(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)
     let data = await registerData.findOne({ guildID: message.guild.id })
     if(!data) new registerData({guildID: message.guild.id, regkilit: false}).save();
      let channels = message.guild.channels.cache.filter(ch => ch.parentId == conf.registerParents)

const embed = new Discord.EmbedBuilder()
.setColor("#2f3136")
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Aşağıdaki Butonları Kullanarak Sunucunun Register Sistemini Kapatıp Açabilirsiniz.
\`\`\`diff
- Register Kilit Sistemi : ${data.regkilit ? "Açık" : "Kapalı"}

+ Register voice kanallarının ve register sisteminin kilitlenmesini/açılmasını istiyorsanız: Register Kilit butonunu kullanın.\`\`\`

`);

const ac = new ButtonBuilder()
    .setCustomId("kayıtaç")
    .setLabel("Kayıtları Aç")
    .setStyle(ButtonStyle.Secondary)

    const kapa = new ButtonBuilder()
    .setCustomId("kayıtkapa")
    .setLabel("Kayıtları Kapat")
    .setStyle(ButtonStyle.Secondary)

    const iptal = new ButtonBuilder()
    .setCustomId("iptal")
    .setLabel("İptal Et")
    .setStyle(ButtonStyle.Secondary)

    if (data && data.regkilit === false) {
      ac.setStyle('Secondary').setDisabled(true);
    } else {
      ac.setStyle('Success');
    }

    if (data && data.regkilit === true) {
      kapa.setStyle('Secondary').setDisabled(true);
    } else {
      kapa.setStyle('Danger');
    }

    const regkilitrow = new ActionRowBuilder()
    .addComponents([ ac, kapa, iptal]);

      let msg = await message.channel.send({embeds: [embed], components: [regkilitrow]}).then(async (msg) => {
     
    var filter = (interaction) => interaction.user.id == message.author.id;
    let collector = msg.createMessageComponentCollector({filter: filter, time: 60000});
    collector.on('collect', async (interaction) => {

 if (interaction.customId === "kayıtaç") {

const kilitaçembed = new Discord.EmbedBuilder()
.setDescription(`
**${message.guild.name}** Sunucusunun Register Kilit sistemi şuan: ${data.regkilit ? "Kapatıldı" : ""}

`);

        data.regkilit = false;
        data.save();
interaction.update({embeds: [kilitaçembed], components: []})
}


 if (interaction.customId === "kayıtkapa") {

const kilitleembed = new Discord.EmbedBuilder()
.setDescription(`
**${message.guild.name}** Sunucusunun Register Kilit sistemi şuan: ${data.regkilit ? "" : "Açıldı"}

`);

        data.regkilit = true;
        data.save();

interaction.update({embeds: [kilitleembed], components: []})
}


if(interaction.customId === "iptal") {
  if(msg) msg.delete().catch({})
  interaction.reply({ content :"İşlem Başarıyla İptal Edildi.", ephemeral: true })
}
      collector.on('end', (collected, reason) => {
        if(reason == "time"){
            msg.delete().catch(err => {});
        }
    })
    

    })})}}