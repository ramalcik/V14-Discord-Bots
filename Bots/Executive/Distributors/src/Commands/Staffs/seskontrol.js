const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green } = require("../../../../src/configs/emojis.json");
const voice = require("../../../../src/schemas/voiceInfo");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const ayar = require("../../../../src/configs/ayarName.json");
const emojis = require("../../../../../../emojiName.json")
module.exports = {
  conf: {
    aliases: ["nerede", "n","sestemi"],
    name: "nerede",
    help: "nerede",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    if(!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {message.react(message.guild.emojiGöster(emojis.red))
    return
    }
    const channel = message.guild.channels.cache.get(args[0]);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (channel) {
      const data = await voice.find({}).sort({ date: -1 });
      message.reply({embeds: [embed.setDescription(`
\`${channel.name}\` adlı kanaldaki üyelerin ses bilgileri:

${channel.members.map((x) => `${x.toString()}: \`${data.find((u) => u.userID === x.user.id) ? moment.duration(Date.now() - data.find((u) => u.userID === x.user.id).date).format("H [saat], m [dakika], s [saniyedir]") : "Bulunamadı!"} seste.\``).join("\n")}
      `)]});
    } else {
      if (!member.voice.channel) return message.channel.send({ content:`${red} ${member.toString()} üyesi herhangi bir ses kanalında bulunmuyor!`});

      const data = await voice.findOne({ userID: member.user.id });
      mmessage.react(message.guild.emojiGöster(emojis.green))
      let voiceChannel = member.voice.channel
      let limit = member.voice.channel.userLimit || "0";

      voiceChannel.createInvite().then(invite =>
message.reply({ embeds: [embed.setDescription(`
${member.toString()} kişisi <#${member.voice.channel.id}> kanalında. **Mikrofonu ${member.voice.mute ? `Kapalı` : `Açık`}**, **Kulaklığı ${member.voice.deaf ? `Kapalı` : `Açık`}** Kanala gitmek için [tıklaman](https://discord.gg/${invite.code}) yeterli
\`\`\`\nAktif Bilgiler:\n\`\`\`
<#${member.voice.channel.id}> kanalındaki üye durumu \`${voiceChannel.members.size}/${limit}\` 
`).setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) }).setFooter({ text: `${moment(Date.now()).format("LLL")}`})]}));

    }
  },
};