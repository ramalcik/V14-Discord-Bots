const coin = require("../../../../src/schemas/coin");
const ayar = require("../../../../src/configs/sunucuayar.json");
const { PermissionsBitField } = require("discord.js");
const client = global.bot;
module.exports = {
  conf: {
    aliases: ["coin"],
    name: "coin",
    help: "coin [ekle/sil/gönder] [kullanıcı] [sayı]",
    owner: true,
    category: "sahip",
  },

  run: async (client, message, args, embed, prefix) => {
    if(![ayar.sahipRolu].some(role => message.member.roles.cache.get(role)) && (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))) 
  return message.channel.send({ content: `Bu komutu kullanabilmek için ayarlanan sahip rolüne sahip olmalısınız!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!member) return message.channel.send({ content:"Bir kullanıcı belirtmelisin!"});

    if (args[0] === "ekle" || args[0] === "add") {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
      if (member.user.id === message.author.id) return message.channel.send({ content:"Kendine coin ekleyemezsin!"});
      const count = parseInt(args[2]);
      if (!count) return message.channel.send({ content:"Eklemek için bir sayı belirtmelisin!"});
      if (!count < 0) return message.channel.send({ content:"Eklenecek sayı 0'dan küçük olamaz!"});

      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: count } }, { upsert: true });
      const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
      let addedRoles = "";
      if (coinData && client.ranks.some(x => coinData.coin >= x.coin && !member.roles.cache.has(x.role))) {
        const roles = client.ranks.filter(x => coinData.coin >= x.coin && !member.roles.cache.has(x.role));
        addedRoles = roles;
        member.roles.add(roles[roles.length-1].role);
        client.channels.cache.find(x => x.name == "rank_log").send({ embeds: [embed.setDescription(`${member.toString()} üyesine ${message.member.toString()} tarafından **${count}** adet coin eklendi ve kişiye ${roles.filter(x => roles.indexOf(x) === roles.length-1).map(x => `<@&${x.role}>`).join("\n")} rolleri verildi!`)]});
      }
      message.channel.send({ embeds: [embed.setDescription(`Başarıyla ${member.toString()} kullanıcısına **${count}** adet coin eklendi! \n\n${addedRoles.length > 0 ? `Verilen roller: \n${addedRoles.filter(x => addedRoles.indexOf(x) === addedRoles.length-1).map(x => `<@&${x.role}>`).join("\n")}` : ""}`)]});
    } else if (args[0] === "sil" || args[0] === "remove") {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
      if (member.user.id === message.author.id) return message.channel.send({ content:"Kendinden coin çıkaramazsın!"});
      const count = parseInt(args[2]);
      if (!count) return message.channel.send({ content:"Çıkarılacak için bir sayı belirtmelisin!"});
      if (!count < 0) return message.channel.send({ content:"Çıkarılacak sayı 0'dan küçük olamaz!"});
      let coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
      if (!coinData || coinData && count > coinData.coin) return message.channel.send({ content:"Çıkarmak istediğiniz sayı, kişinin mevcut coininden büyük olamaz!"});

      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: -count } }, { upsert: true });
      coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
      let removedRoles = "";
      if (coinData && client.ranks.some(x => coinData.coin < x.coin && member.roles.cache.has(x.role))) {
        const roles = client.ranks.filter(x =>  coinData.coin < x.coin && member.roles.cache.has(x.role));
        removedRoles = roles;
        roles.forEach(x => {
          member.roles.remove(x.role)
        });
        client.channels.cache.find(x => x.name == "rank_log").send({ embeds: [embed.setDescription(`${member.toString()} üyesinden ${message.member.toString()} tarafından **${count}** adet coin çıkarıldı ve kişiden ${roles.map(x => `<@&${x.role}>`).join(", ")} rolleri alındı!`)]});
      }
      message.channel.send({ embeds: [embed.setDescription(`Başarıyla ${member.toString()} kullanıcısından **${count}** adet coin çıkarıldı! \n\n${removedRoles.length > 0 ? `Alınan roller: \n${removedRoles.map(x => `<@&${x.role}>`).join("\n")}` : ""}`)]});
    } else if (args[0] === "ver" || args[0] === "give" || args[0] === "gönder") {
      if (member.user.id === message.author.id) return message.channel.send({ content:"Kendine coin veremezsin!"});
      const count = parseInt(args[2]);
      if (!count) return message.channel.send({ content:"Coin vermek için bir sayı belirtmelisin!"});
      if (!count < 0) return message.channel.send({ content:"Verilecek sayı 0'dan küçük olamaz!"});
      let coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (!coinData || coinData && count > coinData.coin) return message.channel.send({ content:"Göndereceğin sayı kendi coininden yüksek olamaz!"});

      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: count } }, { upsert: true });
      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { coin: -count } }, { upsert: true });
      coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (coinData && client.ranks.some(x => coinData.coin < x.coin && message.member.roles.cache.has(x.role))) {
        const roles = client.ranks.filter(x =>  coinData.coin < x.coin && message.member.roles.cache.has(x.role));
        roles.forEach(x => {
          message.member.roles.remove(x.role)
        });
      }
      const coinData2 = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
      if (coinData2 && client.ranks.some(x => coinData2.coin >= x.coin && !member.roles.cache.has(x.role))) {
        const roles = client.ranks.filter(x => coinData2.coin >= x.coin && !member.roles.cache.has(x.role));
        member.roles.add(roles[roles.length-1].role);
      }
      
      message.channel.send({ embeds: [embed.setDescription(`${member.toString()} kişisine başarıyla **${count}** coin gönderildi!`)]});
    }
  }
};
