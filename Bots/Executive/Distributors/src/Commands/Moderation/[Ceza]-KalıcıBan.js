const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const forceBans = require("../../../../src/schemas/forceBans");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green,bann } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["forceban","yargi","yargı","sg","ikile","sikdir"],
    name: "forceban",
    help: "forceban <papaz/ID>",
    category: "sahip",
    owner: true
  },

  run: async (client, message, args, embed) => {

    if (message.guild === null) {
      return message.reply({ embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Bu komutu sadece Sunucuda kullanabilirsin`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Bot developerı olmadığın için kurulumu yapamazsın`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    } else {

    }

    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!args[0]) { message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(red)
    return }
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!user) {  message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Böyle bir kullanıcı bulunamadı!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(red)
    return }
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: user.id });
    if (ban) {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üye zaten banlı!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    const member = message.guild.members.cache.get(user.id);
    if (message.guild.members.cache.has(user.id) && message.member.roles.highest.position <= message.guild.members.cache.get(user.id).roles.highest.position) return message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (member && !member.bannable) {
    message.react(red) }
    message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üyeyi banlayamıyorum!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    if (allah.Main.dmMessages) user.send({ content :`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından **${reason}** sebebiyle **kalıcı olarak** banlandınız!`}).catch(() => {});

    message.guild.members.ban(user.id, { reason }).catch(() => {});
    await new forceBans({ guildID: message.guild.id, userID: user.id, staff: message.author.id }).save();
    const penal = await client.penalize(message.guild.id, user.id, "FORCE-BAN", true, message.author.id, reason);

    message.reply({ content :`${bann} ${member ? member.toString() : user.username} üyesi ${message.author} tarafından \`${reason}\` nedeniyle **kalıcı olarak** banlandı \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    message.react(green)

      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : user.username}** adlı kullanıcı **${message.author.tag}** tarafından banlandı.`)
      .addFields(
        { name: "Cezalandırılan",  value: `[${member ? member.user.tag : user.username}](https://discord.com/users/${user.id})`, inline: true },
        { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

      message.guild.channels.cache.get(conf.banLogChannel).send({ embeds: [log]});
  },
};

