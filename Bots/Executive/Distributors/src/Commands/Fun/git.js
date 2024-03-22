const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const papazayar = require('../../../../src/configs/sunucuayar.json')
const { green, red } = require("../../../../src/configs/emojis.json")
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
    conf: {
      aliases: ["git"],
      name: "git",
      help: "git <papaz/ID>",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ayar.KomutKullanımKanalİsim;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  if (!message.member.voice.channel) {
    return  message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir ses kanalında olmalısın`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}
  if (!member) {
    return  message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye etiketle ve tekrardan dene`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}
  if (!member.voice.channel) {
    return  message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu kullanıcı herhangi bir ses kanalında bulunmuyor`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}
  if (message.member.voice.channel === member.voice.channel) {
    return  message.reply({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Zaten aynı kanaldasınız`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("onay")
.setLabel("Kabul Et")
.setStyle(ButtonStyle.Success)
.setEmoji(green),

new ButtonBuilder()
.setCustomId("red")
.setLabel("Reddet")
.setStyle(ButtonStyle.Danger)
.setEmoji(red),
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

  if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      message.member.voice.setChannel(member.voice.channel.id)
      message.react(green)
      message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${message.author}, ${member} kişisini yanınıza gittiniz.`)] });
      const log = embed
      .setDescription(`
      Bir Transport işlemi gerçekleşti.
  
      Odaya Giden Kullanıcı: ${member} - \`${member.id}\`
      Odasına Gidilen Yetkili: ${message.author} - \`${message.author.id}\`
      `)
      .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
      client.channels.cache.find(x => x.name == "go_log").wsend({ embeds: [log] });
} else {    

let papaz = new EmbedBuilder()
.setDescription(`${member}, ${message.author} \`${member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
.setFooter({ text: `30 saniye içerisinde işlem iptal edilecektir.`})
.setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })

let msg = await message.channel.send({ content: `${member}`, embeds: [papaz], components: [row] })

var filter = button => button.user.id === member.user.id;

let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (button) => {

if(button.customId === "onay") {
  await button.deferUpdate();

const embeds = new EmbedBuilder() 
.setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
.setTimestamp()
.setDescription(`${message.author}, ${member} kişisinin yanına başarıyla gittiniz.`)

message.member.voice.setChannel(member.voice.channel.id)

msg.edit({
embeds: [embeds],
components : [row2]
})

}

if(button.customId === "red") {
  await button.deferUpdate();

const embedss = new EmbedBuilder() 
.setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
.setTimestamp()
.setDescription(`${message.author}, ${member} yanına gitme işlemi iptal edildi.`)

msg.edit({
  embeds: [embedss],
  components : [row3]
})
    }
 });

}
}
}
