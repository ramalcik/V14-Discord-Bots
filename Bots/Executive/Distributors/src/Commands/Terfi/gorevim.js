const moment = require("moment");
require("moment-duration-format");
const client = global.bot;
const tasks = require("../../../../src/schemas/task");
const messageUserChannel = require("../../../../src/schemas/messageUserChannel");
const voiceUserChannel = require("../../../../src/schemas/voiceUserChannel");
const streamerUserChannel = require("../../../../src/schemas/streamerUserChannel");
const cameraUserChannel = require("../../../../src/schemas/cameraUserChannel");
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const isimler = require("../../../../src/schemas/names");
const register = require("../../../../src/schemas/registerStats");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviterMember = require("../../../../src/schemas/inviteMember");
const streamerUser = require("../../../../src/schemas/streamerUser");
const cameraUser = require("../../../../src/schemas/cameraUser");
const Discord = require("discord.js");
const { PermissionsBitField } = require("discord.js")
const conf = require("../../../../src/configs/sunucuayar.json")
const emojis = require("../../../../../../emojiName.json")
const { Muhabbet, gulucuk, mesaj2, galp, staff ,rewards , fill, empty, fillStart, emptyEnd, fillEnd, red } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["gorevler", "görevler", "yapmamgerekenler"],
    name: "görevler",
    help: "görevler @Ramal/ID",
    category: "yetkili"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)
const msj = await message.reply({embeds: [embed.setDescription(`${message.guild.name} sunucusunda ${member} kullanıcısına ait veriler yükleniyor. Lütfen bekleyin!`)]})
const mtask = await tasks.find({ guildID: message.guild.id, userID: member.user.id });
function progressBar(value, maxValue, size) {
const fill = `${message.guild.emojiGöster(emojis.fill)}`;
const fillStart = `${message.guild.emojiGöster(emojis.fillstart)}`;
const fillEnd = `${message.guild.emojiGöster(emojis.fillEnd)}`;
const empty = `${message.guild.emojiGöster(emojis.empty)}`;
const emptyEnd = `${message.guild.emojiGöster(emojis.emptyend)}`;  
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
msj.edit({embeds: [embed.setDescription(`
Toplam Görev Sayısı: \`${mtask.length}\`
Tamamlanmış Görev Sayısı: \`${mtask.filter((x) => x.completed).length}\`
Tamamlanmamış Görev Sayısı: \`${mtask.filter((x) => !x.completed).length}\`
Aktif Görev Sayısı: \`${mtask.filter((x) => x.active).length}\`
${mtask.filter((x) => x.active).map((x) => `\`#${x.id}\` ${x.message} \n${x.completedCount >= x.count ? `${message.guild.emojiGöster(emojis.yes)}` + " **Tamamlandı!**" : `${progressBar(x.completedCount, x.count, 8)} \`${x.type === "ses" || x.type === "yayin" || x.type == "camera" ? `${moment.duration(x.completedCount).format("H [saat], m [dk], s [sn]")} / ${moment.duration(x.count).format("H [saat], m [dk], s [sn]")}` : `${x.completedCount} / ${x.count}`}\` \nKalan Süre: \`${moment.duration(x.finishDate - Date.now()).format("H [saat], m [dakika] s [saniye]")}\` \nÖdül: **${x.prizeCount} puan**`}`).join("\n\n")}        

`)]})    
  }
  }