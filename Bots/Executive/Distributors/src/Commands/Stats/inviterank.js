const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../../src/schemas/inviteMember");
const conf = require("../../../../src/configs/sunucuayar.json")
const {  green } = require("../../../../src/configs/emojis.json");
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["invite"],
    name: "invites",
    help: "invite (stat [user])",
    category: "stat",
  },


  run: async (client, message, args) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
    const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    let tagged;
    if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
    else tagged = 0;

    const embed = new EmbedBuilder()
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setDescription(`${green} Toplam \`${total}\` davet \`${regular}\` gerçek \`${bonus}\` bonus \`${leave}\` ayrılmış \`${fake}\` fake`);

    message.channel.send({ embeds: [embed]}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
  },
};
