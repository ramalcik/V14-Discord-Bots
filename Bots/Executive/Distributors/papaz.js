const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const client = global.bot = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const discordModals = require('discord-modals');
discordModals(client);
const conf = require("../src/configs/sunucuayar.json");
const fs = require("fs");
const moment = global.moment = require("moment");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder,EmbedBuilder } = require("discord.js")
const { Database } = require("ark.db");
const papazdb = (global.papazsetupxd = new Database("../src/configs/sunucuayar.json"));
const emojidb = (global.emojidb = new Database("../src/configs/emojis.json"));
const rankdb = (global.rankdb = new Database("../src/configs/ranks.json"));
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
const allah = require("../../../config.json");
const Discord = require("discord.js")
//KOMUT ÇALIŞTIRMA
fs.readdir('./src/Commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[Moderation] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/Commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/Commands/${f}/` + file);
        console.log(`[Moderation Commands] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
    console.log(`[Moderation] ${files.length} komut yüklenecek.`);
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(allah.Main.ModerationToken)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


  ///// slash commands
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync('./src/Slashcommands/').forEach(async category => {
		const commands = fs.readdirSync(`./src/Slashcommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
		for (const command of commands) {
		const Command = require(`./src/Slashcommands/${category}/${command}`);
    client.slashcommands.set(Command.data.name, Command);
    slashcommands.push(Command.data.toJSON());
		}
	});
  
	const rest = new REST({ version: '10' }).setToken(allah.Main.ModerationToken);
  (async () => {
	try {
		console.log('[papaz] Slash ve Komutlar yükleniyor.');
		await rest.put(
			Routes.applicationGuildCommands(allah.Main.BotClientID, allah.GuildID),
			{ body: slashcommands },
		).then(() => {
			console.log('[papaz] Slash ve Context Komutlar yüklendi.');
		});
	}
	catch (e) {
		console.error(e);
	}
})();

client.on('interactionCreate', (interaction) => {
if (interaction.type == InteractionType.ApplicationCommand) {
if(interaction.user.bot) return;
try {
const command = client.slashcommands.get(interaction.commandName)
command.execute(interaction, client)
if (!interaction.inGuild() && interaction.isCommand()) return x.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
} catch {
interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
}}
});

const bots = global.allbots = [];
let tkn = []

const xd = [
    allah.Main.ModerationToken,
    allah.Main.RegisterToken,
    allah.Main.StatsToken,
    allah.Guard.Token.Guard_I,
    allah.Guard.Token.Guard_II,
    allah.Guard.Token.Guard_III
];
xd.forEach(xxx => 
tkn.push(xxx)
)
allah.Guard.Token.Dağıtıcı.forEach(xx => 
tkn.push(xx)
)
if(allah.Welcome.Active) {
allah.Welcome.Tokens.forEach(x => 
tkn.push(x)
)
}
tkn.forEach(async (token) => {
  const botClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
      presence: {
          status: "invisible",
          
      },
  });

  botClient.on("ready", async () => {
      bots.push(botClient);
  });

  await botClient.login(token);
});

Discord.Guild.prototype.emojiGöster = function(content) {
  let emoji = client.emojis.cache.find(e => e.name === content) || client.emojis.cache.find(e => e.id === content) || client.emojis.cache.find(e => e.id === content) || client.emojis.cache.find(e => e.name === content)
  if(!emoji) return;
  return emoji;
}

const Seens = require("../src/schemas/seens")

client.on("messageCreate", async (message) => {
  if(message.webhookId || message.author.bot || message.channel.type === "dm" || !message.guild || allah.Main.prefix.some(x => message.content.startsWith(x))) return;
  await Seens.updateOne({userID: message.author.id}, {$set: {
      "lastSeen": Date.now(),
      "lastMessage": Date.now(),
      "last": {
          type: "MESSAGE",
          date: Date.now(),
          channel: message.channel.id,
          text: message.content ? message.content : "İçerik Bulunamadı!",
      }
    }
  }
  )
}
)


let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;

const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
    return tarihci;
};

const kalanzaman = global.kalanzaman = function(tarih) {
    return moment.duration((tarih - Date.now())).format('H [Saat,] m [Dakika,] s [Saniye]');
}

client.emoji = function (emojiName)  {
  const emoji = client.emojis.cache.find(x => x.name.includes(emojiName));
  if (!emoji) return null;
  return emoji;
} 

const chatModel = require("../src/schemas/chatGSchema")
client.on('messageCreate', async (message) => {
    if(!message.guild || message.author.bot || message.author.id === message.guild.ownerId) return;
     const Database = await chatModel.findOne({ ServerID: message.guild.id });
     

if (Database && Database.FiltredWords.some(Word => ` ${message.content.toLowerCase()} `.includes(` ${Word} `)) === true) {
      if (message && message.deletable) message.delete().catch(() => {});
      return message.reply({ embeds: [new EmbedBuilder() 
      .setDescription('<@'+message.author.id+'>, Bu Mesaj Bir Owner Tarafından Yasaklanmıştır.')]}).then(x => setTimeout(async() => { x.delete()}, 3000)).catch(() => {});
     }
 });

const rakam = client.sayıEmoji = (sayi) => {
  var ramalcim = sayi.toString().replace(/ /g, "     ");
  var ramalcim2 = ramalcim.match(/([0-9])/g);
  ramalcim = ramalcim.replace(/([a-zA-Z])/g, "Belirlenemiyor").toLowerCase();
  if (ramalcim2) {
    ramalcim = ramalcim.replace(/([0-9])/g, d => {
      return {
        '0': client.emoji("sayiEmoji_sifir") !== null ? client.emoji("sayiEmoji_sifir") : "\` 0 \`",
        '1': client.emoji("sayiEmoji_bir") !== null ? client.emoji("sayiEmoji_bir") : "\` 1 \`",
        '2': client.emoji("sayiEmoji_iki") !== null ? client.emoji("sayiEmoji_iki") : "\` 2 \`",
        '3': client.emoji("sayiEmoji_uc") !== null ? client.emoji("sayiEmoji_uc") : "\` 3 \`",
        '4': client.emoji("sayiEmoji_dort") !== null ? client.emoji("sayiEmoji_dort") : "\` 4 \`",
        '5': client.emoji("sayiEmoji_bes") !== null ? client.emoji("sayiEmoji_bes") : "\` 5 \`",
        '6': client.emoji("sayiEmoji_alti") !== null ? client.emoji("sayiEmoji_alti") : "\` 6 \`",
        '7': client.emoji("sayiEmoji_yedi") !== null ? client.emoji("sayiEmoji_yedi") : "\` 7 \`",
        '8': client.emoji("sayiEmoji_sekiz") !== null ? client.emoji("sayiEmoji_sekiz") : "\` 8 \`",
        '9': client.emoji("sayiEmoji_dokuz") !== null ? client.emoji("sayiEmoji_dokuz") : "\` 9 \`"
      }[d];
    });
  }
  return ramalcim;
}

client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.customId === 'ybasvuruu') {
  
    const modal = new ModalBuilder()
    .setCustomId("ybasvuruu")
    .setTitle("Sorunları İlet")
    const sorunne = new TextInputBuilder()
    .setCustomId("sorunne")
    .setMinLength(10)
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: papaz 20")
    .setStyle(TextInputStyle.Short);
    
    
    const AOne = new ActionRowBuilder().addComponents(sorunne);
    
    modal.addComponents(AOne);
    await interaction.showModal(modal);
    
    
      }
  


if (interaction.customId === 'sorun') {
  
  const modal = new ModalBuilder()
  .setCustomId("sorunilett")
  .setTitle("Sorunları İlet")
  const sorunne = new TextInputBuilder()
  .setCustomId("sorunne")
  .setMinLength(10)
  .setLabel(`Sorunu Anlatır Mısın?`)
  .setPlaceholder("İsim ve yaşınızı giriniz. Örn: papaz 20")
  .setStyle(TextInputStyle.Paragraph);
  
  
  const AOne = new ActionRowBuilder().addComponents(sorunne);
  
  modal.addComponents(AOne);
  await interaction.showModal(modal);
  
  
    }



if(interaction.customId === 'sorunilett'){
  const s1 = interaction.fields.getTextInputValue('sorunne');
  await interaction.reply({ content: `Sorunun Başarıyla kurucularımıza iletildi.`, ephemeral: true });
  let embed3 = new EmbedBuilder()
  .setDescription(`hey ${interaction.member} adlı üye bir sorununu belirtti.\n`)
  embed3.addFields([{name: `Üye Bilgileri;`,value: `${interaction.member} - (\`${interaction.member.id}\`)`,}])  
  embed3.addFields([{name: `Sorunu;`,value: `${s1}`,}])  

  client.channels.cache.find(x => x.name == "sorun-ilet_log").wsend({ embeds: [embed3]})

  if(interaction.customId === 'ybasvuru'){
    const s1 = interaction.fields.getTextInputValue('soru1');
    const s2 = interaction.fields.getTextInputValue('soru2');
    const s3 = interaction.fields.getTextInputValue('soru3');
    const s4 = interaction.fields.getTextInputValue('soru4');
    const s5 = interaction.fields.getTextInputValue('soru5');
    await interaction.reply({ content: `Sorunun Başarıyla kurucularımıza iletildi.`, ephemeral: true });
    let embed = new EmbedBuilder()
    .setDescription(`hey ${interaction.member} adlı üye bir sorununu belirtti.\n`)
    embed.addFields([{name: `Üye Bilgileri;`,value: `${interaction.member} - (\`${interaction.member.id}\`)`,}])  
    embed.addFields([{name: `İsim Yaş`,value: `${s1}`,}])
    embed.addFields([{name: `Discorda ne kadar süre ayıyabilirsin?`,value: `${s2}`,}])  
    embed.addFields([{name: `Okuma Çalışma durumun?`,value: `${s3}`,}])  
    embed.addFields([{name: `Sunucumuza neler katabilirsin?`,value: `${s4}`,}])  
    embed.addFields([{name: `Sunucumuzda daha önceden yetkili oldun mu?`,value: `${s5}`,}])  
  
    client.channels.cache.find(x => x.name == "başvuru_log").wsend({ embeds: [embed3]})
}
}
}
)

client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.customId === 'ybasvuru') {
  
    const modal = new ModalBuilder()
    .setCustomId("sorunilettt")
    .setTitle("Sorunları İlet")
    const soru1 = new TextInputBuilder()
    .setCustomId("soru1")
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: papaz 20ss")
    .setStyle(TextInputStyle.Short);
    const soru2 = new TextInputBuilder()
    .setCustomId("soru2")
    .setLabel(`Discorda ne kadar süre ayıyabilirsin?`)
    .setPlaceholder(`Örnek: Günlük 3 Saat`)
    .setStyle(TextInputStyle.Short);
    const soru3 = new TextInputBuilder()
    .setCustomId("soru3")
    .setLabel(`Daha önce yetkili oldunuz mu?`)
    .setPlaceholder(`Evet Veya Hayır`)
    .setStyle(TextInputStyle.Short);
    const soru4 = new TextInputBuilder()
    .setCustomId("soru4")
    .setMinLength(10)
    .setLabel(`Neden Yetkili Olmak?`)
    .setPlaceholder(`Bize Neler Kata Bilirsin`)
    .setStyle(TextInputStyle.Paragraph);
    
    
    const AOne = new ActionRowBuilder().addComponents(soru1);
    const soru22 = new ActionRowBuilder().addComponents(soru2);
    const soru33 = new ActionRowBuilder().addComponents(soru3);
    const soru44 = new ActionRowBuilder().addComponents(soru4);
    
    modal.addComponents(AOne, soru22, soru33, soru44);
    await interaction.showModal(modal);
    
    
      }
  
  
  
  if(interaction.customId === 'sorunilettt'){
    const s1 = interaction.fields.getTextInputValue('soru1');
    const s2 = interaction.fields.getTextInputValue('soru2');
    const s3 = interaction.fields.getTextInputValue('soru3');
    const s4 = interaction.fields.getTextInputValue('soru4');
    await interaction.reply({ content: `Yetkili Başvurunuz yöneticilere iletildi.`, ephemeral: true });
    let embed2 = new EmbedBuilder()
    .setDescription(`:tada: **Yeni Yetkili Başvurusu** :tada:
    \`❯\` **__Kullanıcı Hakkında__**
    \`•\` **Kullanıcı:** ${interaction.member}
    \`•\` **ID:** (\`${interaction.member.id}\`)
    
    \`❯\` **__Başvuru Detayı__**

    \`•\` **İsim Ve Yaş:** ${s1}
    
    \`•\` **Discordda ne kadar aktifsin:** ${s2}
    
    \`•\` **Daha önce yetkili oldun mu:** ${s3}
    
    \`•\` **Neden Yetkili Olmak istiyorsun:**
    
    ${s4}`)

  
    client.channels.cache.find(x => x.name == "başvuru_log").wsend({ embeds: [embed2]})
  }
}
)

client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.customId === 'ybasvuruu') {
  
    const modal = new ModalBuilder()
    .setCustomId("ybasvuruu")
    .setTitle("Sorunları İlet")
    const sorunne = new TextInputBuilder()
    .setCustomId("sorunne")
    .setMinLength(10)
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: papaz 20")
    .setStyle(TextInputStyle.Short);
    
    
    const AOne = new ActionRowBuilder().addComponents(sorunne);
    
    modal.addComponents(AOne);
    await interaction.showModal(modal);
    
    
      }
  


if (interaction.customId === 'oneri') {
  
  const modal = new ModalBuilder()
  .setCustomId("onerilet")
  .setTitle("Önerini İlet")
  const sorunnee = new TextInputBuilder()
  .setCustomId("sorunnee")
  .setMinLength(10)
  .setLabel(`Önerini İlete Bilirsin`)
  .setPlaceholder("Örn: Sunucunun Banneri değişin")
  .setStyle(TextInputStyle.Paragraph);
  
  
  const AOne = new ActionRowBuilder().addComponents(sorunnee);
  
  modal.addComponents(AOne);
  await interaction.showModal(modal);
  
  
    }



if(interaction.customId === 'onerilet'){
  const s1 = interaction.fields.getTextInputValue('sorunnee');
  await interaction.reply({ content: `Öneriniz Başarıyla kurucularımıza iletildi.`, ephemeral: true });
  let embed = new EmbedBuilder()
  .setDescription(`:tada: **Yeni Bir Öneri İletildi** :tada:

  **__Kullanıcı Hakkında__**
  **Kullanıcı:** ${interaction.member}
  **ID:** (\`${interaction.member.id}\`)
  
  **Önerisi:** ${s1}`)


  client.channels.cache.find(x => x.name == "oneri_ilet_log").wsend({ embeds: [embed]})
}
}
)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userRoles = require('../src/schemas/SekmeKoruma');

client.on("presenceUpdate", async (user) => {

if (!user) return;
let permss = allah.Guard.StaffPerm;
const member = client.guilds.cache.get(allah.GuildID).members.cache.get(user.userId)
const ozicik = `${Object.keys(member.presence.clientStatus)[0]}`;

const perms = ['Administrator','ManageRoles','ManageWebhooks','ManageChannels','ManageGuild','BanMembers','KickMembers','MentionEveryone']; // Add your permissions here
//sekme guard iste amk
const roller = member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && perms.some(perm => e.permissions.has(perm)));
if (!member.user.bot && member.guild.id === allah.GuildID && perms.some(perm => user.member.permissions.has(perm))) {
  if (await client.checkPermission(client, user.userId, "full")) return;
if (ozicik.includes("web")) {

await userRoles.updateOne({ guildID: allah.GuildID, userID: user.userId }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
await member.roles.remove(roller.map((e) => e.id), "Tarayıcıdan Giriş Yapıldığı İçin Rolleri Alındı.");

let ozi = new EmbedBuilder()
.setDescription(`
> <@${user.userId}> - [\`${user.userId}\`] Web Tarayıcısından Discorda giriş yaptığı için işlem uyğulandı. 

> **Discord Platformuna Sekmeden giriş yaptığı için rolleri alındı**
> **Sekmeden geri çıkınca kullanıcının rolleri verilecektir**

**Rollerin Adı:**
\`\`\`cs\n${roller.map((e) => `${e.name} - ${e.id}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
client.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [ozi] });
}}

if (ozicik.includes("mobile")) {
const veri = await userRoles.findOne({ guildID: allah.GuildID, userID: user.userId });
if (!veri) return;
if (veri.roles || veri.roles.length) {
await veri.roles.map(e => member.roles.add(e, "Platformunu Değiştirdiği İçin Rolleri Geri Verildi.").then(async () => {
await userRoles.findOneAndDelete({ guildID: allah.GuildID, userID: user.userId });
    
let ozi = new EmbedBuilder()
.setDescription(`
> <@${user.userId}> - [\`${user.userId}\`] Web Tarayıcısından Çıkış Yaptı

> **Platform Değiştiren Kullanıcı İçin Yapılan İşlem: Şüphelinin**
> **Rolleri Geri Verildi!**

**Rollerin Adı:**
\`\`\`cs\n${veri.roles.map((e) => `${client.guilds.cache.get(allah.GuildID).roles.cache.get(e).name} - ${e}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({iconURL: client.guilds.cache.get(allah.GuildID).iconURL({ dynamic: true })})
client.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [ozi] });
    
}).catch(() => {}));
}
}

if (ozicik.includes("desktop")) {
const veri = await userRoles.findOne({ guildID: allah.GuildID, userID: user.userId });
if (!veri) return;
if (veri.roles || veri.roles.length) {
await veri.roles.map(e => member.roles.add(e, "Platformunu Değiştirdiği İçin Rolleri Geri Verildi.").then(async () => {
await userRoles.findOneAndDelete({ guildID: allah.GuildID, userID: user.userId });
        
let ozi = new EmbedBuilder()
.setDescription(`
> <@${user.userId}> - [\`${user.userId}\`] Web Tarayıcısından Çıkış Yaptı

> **Platform Değiştiren Kullanıcı İçin Yapılan İşlem: Şüphelinin**
> **Rolleri Geri Verildi!**

**Rollerin Adı:**
\`\`\`cs\n${veri.roles.map((e) => `${client.guilds.cache.get(allah.GuildID).roles.cache.get(e).name} - ${e}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ text: `Sekme Koruması`, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
client.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [ozi] });
        
}).catch(() => {}));
}
} else if (member?.presence?.status === "offline") {
const veri = await userRoles.findOne({ guildID: allah.GuildID, userID: user.userId });
if (!veri) return;
        
let ozi = new EmbedBuilder()
.setDescription(`
> <@${user.userId}> - [\`${user.userId}\`] Web Tarayıcısından Offlineye Geçti

> **Platform Değiştiren Kullanıcı Webden Offlineye Geçtiği için**
> **Rolleri Geri Verilmedi!**
`)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
client.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [ozi] });
}
});

///////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberOffline", async (member, oldStatus) => {

const perms = ['Administrator','ManageRoles','ManageWebhooks','ManageChannels','ManageGuild','BanMembers','KickMembers','MentionEveryone']; // Add your permissions here
    
const roller = member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && perms.some(perm => e.permissions.has(perm)));
if (!member.user.bot && member.guild.id === allah.GuildID && perms.some(perm => member.permissions.has(perm))) {
if (await checkPermission(client, member.user.id, "full") || await checkPermission(client, member.user.id, "sekmeguard")) return;
       
await userRoles.updateOne({ guildID: allah.GuildID, userID: member.user.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
await member.roles.remove(roller.map((e) => e.id), "Offline Moduna Geçildiği İçin Rolleri Alındı.");

if (roller || roller.length) {
let ozi = new EmbedBuilder()
.setDescription(`
> <@${user.userId}> - [\`${user.userId}\`] Web Tarayıcısından Çıkış Yaptı

> **Platform Değiştiren Kullanıcı İçin Yapılan İşlem: Şüphelinin**
> **Rolleri Geri Verildi!**

**Rollerin Adı:**
\`\`\`cs\n${roller.map((e) => `${e.name} - ${e.id}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ iconURL: client.guilds.cache.get(allah.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
client.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [ozi] });
}}
});
///////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////AylikRoller///////////////////////////////////

setInterval(async () => {
  const guild = client.guilds.cache.get(allah.GuildID);

  if (!guild) {
    console.error('Belirtilen sunucu bulunamadı.');
    return;
  }

  const members = guild.members.cache;

  let roleGiven = false; // Role verildi mi kontrolü

  members.forEach(async (member) => {
    const joinedDate = member.joinedAt;
    const currentDate = new Date();
    const diffMonths = Math.floor((currentDate - joinedDate) / (1000 * 60 * 60 * 24 * 30)); // Ay cinsinden fark

    let roleIdToAdd = null;

    // Hangi rolün verileceğini belirleme
    if (diffMonths >= 12) {
      roleIdToAdd = getRoleIdByName(allah.Roles["1Yıllık"]);
    } else if (diffMonths >= 9) {
      roleIdToAdd = getRoleIdByName(allah.Roles["9Aylık"]);
    } else if (diffMonths >= 6) {
      roleIdToAdd = getRoleIdByName(allah.Roles["6Aylık"]);
    } else if (diffMonths >= 3) {
      roleIdToAdd = getRoleIdByName(allah.Roles["3Aylık"]);
    } else if (diffMonths >= 1) {
      roleIdToAdd = getRoleIdByName(allah.Roles["1Aylık"]);
    }

    // Kullanıcıya rolü ekleme
    if (roleIdToAdd && !member.roles.cache.has(roleIdToAdd)) {
      try {
        await member.roles.add(roleIdToAdd);
        console.log(`[${currentDate.toLocaleString()}] ${member.user.tag} kullanıcısına ${diffMonths} aylık rolü verildi.`);
        roleGiven = true;
      } catch (error) {
        console.error(`[${currentDate.toLocaleString()}] ${member.user.tag} kullanıcısına rol verilirken bir hata oluştu:`, error);
      }
    }
  });

  if (!roleGiven) {
    console.log('Rol uygun bir üye bulunamadı.');
  }
}, 24 * 60 * 60 * 1000); // Her 24 saat bir kontrol etmek
console.log('Aylık roller verme işlemi başlatıldı.');

function getRoleIdByName(roleName) {
  const guild = client.guilds.cache.get(allah.GuildID);
  if (!guild) return null;
  
  const role = guild.roles.cache.find(role => role.name === roleName);
  return role ? role.id : null;
}