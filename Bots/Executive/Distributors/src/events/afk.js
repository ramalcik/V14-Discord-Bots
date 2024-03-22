const { EmbedBuilder } = require("discord.js");
const afk = require("../../../src/schemas/afk");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
module.exports = async (message) => {
  if (message.author.bot || !message.guild) return;
  const data = await afk.findOne({ guildID: message.guild.id, userID: message.author.id });
  const embed = new EmbedBuilder().setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })});
  if (data) {
    const afkData = await afk.findOne({ guildID: message.guild.id, userID: message.author.id });
    await afk.deleteOne({ guildID: message.guild.id, userID: message.author.id });
    if (message.member.displayName.includes("[AFK]") && message.member.manageable) await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
    message.reply({ content:`Afk modundan çıktınız. **${moment.duration(Date.now() - afkData.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** süredir AFK'ydınız.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
  }
  
  const member = message.mentions.members.first();
  if (!member) return;
  const afkData = await afk.findOne({ guildID: message.guild.id, userID: member.user.id });
  if (!afkData) return;
  embed.setDescription(`${member.toString()} kullanıcısı, \`${afkData.reason}\` sebebiyle, **${moment.duration(Date.now() - afkData.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** önce afk oldu!`);
  message.channel.send({ embeds: [embed]}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
};

module.exports.conf = {
  name: "messageCreate",
};
