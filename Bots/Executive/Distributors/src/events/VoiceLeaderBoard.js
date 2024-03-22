const allah = require("../../../../../config.json");
const voiceUser = require("../../../src/schemas/voiceUser");
const sex = require("../../../src/schemas/leaderboard");
const moment = require("moment");
const { EmbedBuilder } = require("discord.js");
const client = global.bot;

module.exports = async () => {
  const voiceUsersData = await voiceUser.find({ guildID: allah.GuildID }).sort({ topStat: -1 });
  const voiceUsers = voiceUsersData.splice(0, 10).map((x, index) => `\` ${index+1} \` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);

  let data = await sex.findOne({ guildID: allah.GuildID })
  if (!data || data && !data.voiceListID.length) return

const sunucuisim = client.guilds.cache.get(allah.GuildID).name
let LeaderBoard = await client.channels.cache.find(x => x.name == "leaderboard").messages.fetch(data.voiceListID);
setInterval(() => {
checkingLeader()
}, 600000);
function checkingLeader() {  
const voiceList = (`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`)

let MessageEdit = new EmbedBuilder()
.setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({dynamic:true})})
.setDescription(`🎉 Aşağı da \`${sunucuisim}\` sunucusunun genel ses sıralamasındaki krallar listelenmektedir.\n\n${voiceList}\n\nGüncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)
LeaderBoard.edit({ embeds: [MessageEdit]})

}
}
module.exports.conf = {
name: "ready",
};