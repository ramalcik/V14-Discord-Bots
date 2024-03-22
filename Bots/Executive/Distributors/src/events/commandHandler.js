const { EmbedBuilder } = require("discord.js");
const client = global.bot;
let sended = false;
const allah = require("../../../../../config.json");
const conf = require("../../../src/configs/sunucuayar.json")
const bannedCmd = require("../../../src/schemas/bannedCmd")
setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 8000);

module.exports = async (message) => {
  let prefix = allah.Main.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix || conf.unregRoles.some(x => message.member.roles.cache.has(x)) || conf.jailRole.some(x => message.member.roles.cache.has(x))) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  if ([`${prefix}patlat`, `${prefix}gumlet`].includes(message.content.toLowerCase())){
    return message.channel.send({ content: `Ramal'in Sistemlerini Patlatamassın!` }).sil(5);
}

  const embed = new EmbedBuilder().setFooter({ text: allah.AltBaşlık}).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true })});

  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  let komutLog = client.channels.cache.find(x => x.name == "command_log");

  if (cmd) {
    if (cmd.conf.owner && !allah.owners.includes(message.author.id)) return;

    const veri = await bannedCmd.findOne({
      guildID: message.guild.id
    }) || {
      "kullanici": []
    };                                             
if (veri.kullanici.includes(message.member.id)) return message.reply({embeds: [embed.setDescription(`${message.member} Komut kullanımınız yasaklanmış.`)]})

};
  if (cmd) {
    if (cmd.conf.owner && !allah.owners.includes(message.author.id)) return;
    const cooldown = cmd.conf.cooldown || 3000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
        if (!sended) {
          sended = true;
          return message.channel.send({ content:`${message.author}, Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`}).then((x) => x.delete({ timeout: (cooldown - diff) }));
        }
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    cmd.run(client, message, args, embed, prefix);
    const ramal = new EmbedBuilder()
    .setDescription(`
    \` • \` Komut Kullanılan Kanal: ${message.channel} [\`${message.channel.id}\`]
    \` • \` Komut Kullanan: ${message.author} [\`${message.author.id}\`]
    \` • \` Komut Türü: \` ${prefix}${commandName} \`
    
    `)
    if(komutLog) komutLog.send({ embeds: [ramal]})
  }
};

module.exports.conf = {
  name: "messageCreate",
};
