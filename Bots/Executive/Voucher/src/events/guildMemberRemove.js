const client = global.bot;
const isimler = require("../../../src/schemas/names");
const inviterSchema = require("../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../src/schemas/inviteMember");
const conf = require("../../../src/configs/sunucuayar.json")
const allah = require("../../../../../config.json");
const { cikis } = require("../../../src/configs/emojis.json")

module.exports = async (member) => {
  const channel = member.guild.channels.cache.get(conf.invLogChannel);
  if (!channel) return;
  if (member.user.bot) return;
  const data = await isimler.findOne({ guildID: allah.GuildID, userID: member.user.id });

  if (data && data.names.length) {
  await isimler.findOneAndUpdate({ guildID: allah.GuildID, userID: member.user.id }, { $push: { names: { name: data.names.splice(-1).map((x, i) => `${x.name}`), sebep: "Sunucudan Ayrılma", date: Date.now() } } }, { upsert: true });
  }
  
  const inviteMemberData = await inviteMemberSchema.findOne({ guildID: member.guild.id, userID: member.user.id });
  if (!inviteMemberData) {
    channel.send({ content: `${cikis} \`${member.user.tag}\` sunucumuzdan ayrıldı ama kim tarafından davet edildiğini bulamadım. Sunucumuzda **${member.guild.memberCount}** Üye Kaldi `});
  } else {
    const inviter = await client.users.fetch(inviteMemberData.inviter);
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;
    channel.send({ content:`${cikis} \`${member.user.tag}\` sunucumuzdan ayrıldı. ${inviter.tag} tarafından davet edilmişti. (**${total}** daveti) Sunucumuzda **${member.guild.memberCount}** Üye Kaldi `});
  }
};

module.exports.conf = {
  name: "guildMemberRemove",
};
