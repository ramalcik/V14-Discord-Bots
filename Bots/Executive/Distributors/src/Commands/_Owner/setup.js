const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const { Database } = require("ark.db");
const ayar = require("../../../../src/configs/sunucuayar.json");
const { red, green,Loading  } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

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

    let choose = args[0]

    const row = new ActionRowBuilder()
    .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Sunucu Kurulum Menüsü İçin Tıkla!')
    .addOptions([
      { label: 'Kurulum Menü', description: 'Sunucu İçerisi Kurulum Menüsü.', value: 'help' },
      { label: 'Kontrol Menü', description: 'Sunucuda Kurulmuş Olan Setup Listesi.', value: 'help2' },
    ]),
    );

    

    
    if(!choose) {
    let papaz = new EmbedBuilder()
    .setDescription(`Merhaba ${message.author} Sunucu Kurulumu İçin Aşağıdaki Menüyü Kullan !! Komutun Kullanıldığı Tarih \`${moment(Date.now()).format("LLL")}\` `)
    .setColor("Random")
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Setup Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    message.reply({ embeds: [papaz],components: [row] })
    }

    
    const filter = i => i.user.id == message.author.id    
let collector = await message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5, time: 120000 })
collector.on("collect", async (interaction) => {
    
if (interaction.values[0] === "help") {
    const rol1 = new EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Setup Rol Kurulum Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
    .setDescription(` 
> **Rol Kurulum Menüsü**
\`\`\`fix
!kur manRoles <Örnek: @Erkek1 @Erkek2 >
!kur womanRoles <Örnek: @Kadın1 @Kadın2 >
!kur unregRoles <Örnek: @Kayıtsız >
!kur familyRole <Örnek: @Taglı >
!kur boosterRole <Örnek: @Booster Rol >
!kur staffs <Örnek: @Yetkili @Yetkili2 >
!kur yetkiliRoles <Örnek: @SağGörünümPerm @RegisterRol >
!kur teyitciRoles <Örnek: @BotKomut @RegisterRol >
!kur sahipRoles <Örnek: @Owner @Ceo >
!kur rolverici <Örnek: @Tag @ÇiftTag >
!kur katıldı <Örnek: @Katıldı >(Toplantı)
!kur yetkilialım <Örnek: @Yetkili Alım DM >
!kur jailRole <Örnek: @Karantina>
!kur yasaklıRole <Örnek: @Yasaklı Tag>
!kur underworldRole <Örnek: @Underworld/@Doom >
!kur chatMute <Örnek: @Muted >
!kur voiceMute <Örnek: @V.Muted >
!kur fakeAccRole <Örnek: @Şüpheli >
!kur warnHammer <Örnek: @Warn Hammer >
!kur banHammer <Örnek: @Ban Hammer >
!kur jailHammer <Örnek: @Jail Hammer >
!kur cmuteHammer <Örnek: @Mute Hammer >
!kur vmuteHammer <Örnek: @V.Mute Hammer >
\`\`\`

`)

message.reply({ embeds: [rol1] })
}
if (interaction.values[0] === "help") {
const kanal1 = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setFooter({text : `${message.guild.name} | Setup Kanal Kurulum Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
.setDescription(` 
> **Kanal Kurulum Menüsü**
\`\`\`fix
!kur kurallar <Örnek: #rules >
!kur chatChannel <Örnek: #chat >
!kur welcomeChannel <Örnek: #welcome-to-server >
!kur inviteChannel <Örnek: #invite-channel >
!kur banLogChannel <Örnek: #ban-log >
!kur doomLogChannel <Örnek: #underworld-log >
!kur jailLogChannel <Örnek: #jail-log >
!kur cmuteLogChannel <Örnek: #mute-bilgi >
!kur vmuteLogChannel <Örnek: #ses-mute-bilgi >
!kur warnLogChannel <Örnek: #uyarı-log >
!kur cezapuanlog <Örnek: #ceza-puan-bilgi >
\`\`\`

`)

message.reply({ embeds: [kanal1] })
}
if (interaction.values[0] === "help") {
const kategori1 = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setFooter({text : `${message.guild.name} | Kategori Kurulum Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
.setDescription(` 
> **Kategori Kurulum Menüsü**
\`\`\`fix
!kur registerParents 
!kur publicParent
!kur funParents 
!kur solvingParents 
!kur privateParents 
!kur aloneParents
\`\`\`

`)

message.reply({ embeds: [kategori1] })
}
if (interaction.values[0] === "help") {
const sunucu1 = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setFooter({text : `${message.guild.name} | Sunuucu Kurulum Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
.setDescription(` 
> **Sunucu Kurulum Menüsü**
\`\`\`fix
!kur tag \`<Örnek: ✬ >\`
!kur tag2 \`<Örnek: ✬ >\`
!kur tag3 \`<Örnek: ✬ >\`
!kur tag4 \`<Örnek: ✬ >\`
!kur tag5 \`<Örnek: ✬ >\`
!kur tag6 \`<Örnek: ✬ >\`
!kur ikinciTag \`<Örnek: • >\`
!kur url \`<Örnek: papaz >\`
\`\`\`

`)

message.reply({ embeds: [sunucu1] })
}

    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////
    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////
    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////
    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////

if (interaction.values[0] === "help2") {
const veri1 = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setFooter({text : `${message.guild.name} | Kontrol Menüsü Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
.setDescription(` 
> **Kontrol Menüsü**
Bot-Owner: (${allah.owners.length > 0 ? `${allah.owners.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
Tag: (\` ${ayar.tag ? ayar.tag : "YOK"} \`) / (\` ${ayar.ikinciTag ? ayar.ikinciTag : "YOK"} \`)
Link: (${ayar.serverUrl ? ayar.serverUrl : "\`YOK\`"})
Man Roles: (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Woman Roles: (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Unregister Role: (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Family Role: (${ayar.ekipRolu ? `<@&${ayar.ekipRolu}>` : "\`YOK\`"})
Booster Role: (${ayar.boosterRolu ? `<@&${ayar.boosterRolu}>` : "\`YOK\`"})
Staff Roles: (${ayar.staffs.length > 0 ? `${ayar.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yetkili Roles: (${ayar.yetkiRolleri.length > 0 ? `${ayar.yetkiRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Teyitci Roles: (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Sahip Roles: (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Rol Verici Roles: (${ayar.rolverici.length > 0 ? `${ayar.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Canlı Destek Role: (${ayar.canlıdestekRol ? `<@&${ayar.canlıdestekRol}>` : "\`YOK\`"})
Yetkili Alım Role: (${ayar.yetkilialımRol ? `<@&${ayar.yetkilialımRol}>` : "\`YOK\`"})
Toplantı Katıldı Role: (${ayar.Katıldı ? `<@&${ayar.Katıldı}>` : "\`YOK\`"})
Vip Role: (${ayar.vipRole ? `<@&${ayar.vipRole}>` : "\`YOK\`"})
Müzisyen Rol: (${ayar.müzisyenRole ? `<@&${ayar.müzisyenRole}>` : "\`YOK\`"})
Tasarımcı Rol: (${ayar.tasarımcıRole ? `<@&${ayar.tasarımcıRole}>` : "\`YOK\`"})
Streamer Role: (${ayar.streamerRole ? `<@&${ayar.streamerRole}>` : "\`YOK\`"})
Terapist Rol: (${ayar.terapistRole ? `<@&${ayar.terapistRole}>` : "\`YOK\`"})
Sorun Çözme Rol: (${ayar.sorunçözücüRole ? `<@&${ayar.sorunçözücüRole}>` : "\`YOK\`"})
Jail Role: (${ayar.jailRole.length > 0 ? `${ayar.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yasaklı Tag Role: (${ayar.yasaklıRole.length > 0 ? `${ayar.yasaklıRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Underworld Role: (${ayar.doomRole.length > 0 ? `${ayar.doomRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Chat Mute Role: (${ayar.chatMute.length > 0 ? `${ayar.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Voice Mute Role: (${ayar.voiceMute.length > 0 ? `${ayar.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"}))
Fake Account Role: (${ayar.fakeAccRole.length > 0 ? `${ayar.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Warn Hammer Role: (${ayar.warnHammer.length > 0 ? `${ayar.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Ban Hammer Role: (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Jail Hammer Role: (${ayar.jailHammer.length > 0 ? `${ayar.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
CMute Hammer Role: (${ayar.cmuteHammer.length > 0 ? `${ayar.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
VMute Hammer Role: (${ayar.vmuteHammer.length > 0 ? `${ayar.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Kurallar: (${ayar.kurallar.length ? `<#${ayar.kurallar}>` : "\`YOK\`"})
Chat Channel: (${ayar.chatChannel.length ? `<#${ayar.chatChannel}>` : "\`YOK\`"})
Welcome Channel: (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
İnvite Channel: (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})
Ban Log Channel: (${ayar.banLogChannel.length ? `<#${ayar.banLogChannel}>` : "\`YOK\`"})
Underworld Log Channel: (${ayar.doomLogChannel.length ? `<#${ayar.doomLogChannel}>` : "\`YOK\`"})
Jail Log Channel: (${ayar.jailLogChannel.length ? `<#${ayar.jailLogChannel}>` : "\`YOK\`"})
CMute Log Channel: (${ayar.cmuteLogChannel.length ? `<#${ayar.cmuteLogChannel}>` : "\`YOK\`"})
VMute Log Channel: (${ayar.vmuteLogChannel.length ? `<#${ayar.vmuteLogChannel}>` : "\`YOK\`"})
Warn Log Channel: (${ayar.warnLogChannel.length ? `<#${ayar.warnLogChannel}>` : "\`YOK\`"})
Ceza-Puan Log Channel: (${ayar.cezapuanlog.length ? `<#${ayar.cezapuanlog}>` : "\`YOK\`"})
Register Parents: (** ${ayar.registerParents.length ? `${ayar.registerParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Public Parent: (** ${ayar.publicParents.length ? `<#${ayar.publicParents}>` : "\`YOK\`"} **)
Fun Parents: (** ${ayar.funParents.length > 0 ? `${ayar.funParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Solving Parents: (** ${ayar.solvingParents.length > 0 ? `${ayar.solvingParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Private Parents: (** ${ayar.privateParents.length ? `${ayar.privateParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Alone Parents: (** ${ayar.aloneParents.length ? `${ayar.aloneParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
  `)
  
  message.reply({ embeds: [veri1] })
  }



    })
    
    /////
    const setup1 = [
{ name: ["tag"], conf: "tag", cmdName: "Tag" },
{ name: ["tag1"], conf: "tag1", cmdName: "Tag1" },
{ name: ["tag3"], conf: "tag3", cmdName: "Tag3" },
{ name: ["tag4"], conf: "tag4", cmdName: "Tag4" },
{ name: ["tag5"], conf: "tag5", cmdName: "Tag5" },
{ name: ["tag6"], conf: "tag6", cmdName: "Tag6" },
{ name: ["secondarytag", "secondary-tag", "ikincitag", "ikinciTag"], conf: "ikinciTag", cmdName: "İkinci Tag" },
{ name: ["link", "url"], conf: "serverUrl", cmdName: "Url" },
    ]
    
    const setup2 = [
{ name: ["staffs","staffrole","staffRole","staffRoles"], conf: "staffs", cmdName: "Yetkili Rol(leri)" },
{ name: ["erkekrol","manrole","manRoles","manroles"], conf: "erkekRolleri", cmdName: "Erkek Rol(leri)" },
{ name: ["kadınrol","womanrole","womanRoles","womanroles"], conf: "kizRolleri", cmdName: "Kız Rol(leri)" },
{ name: ["kayıtsızrol","unregisterrole","unregisterRole","unregRoles"], conf: "unregRoles", cmdName: "Kayıtsız Rol(leri)" },
{ name: ["yetkilirol","yetkilirole","yetkiliRole","yetkiliRoles"], conf: "yetkiRolleri", cmdName: "Yetki Rol(leri)" },
{ name: ["teyitcirol","teyitcirole","teyitciRole","teyitciRoles"], conf: "teyitciRolleri", cmdName: "Teyitci Rol(leri)" },
{ name: ["sahiprol","sahiprole","sahipRole","sahipRoles"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
{ name: ["warnHammer","warnhammer","warnh"], conf: "warnHammer", cmdName: "Warn Hammer" },
{ name: ["banHammer","banhammer","banh"], conf: "banHammer", cmdName: "Ban Hammer" },
{ name: ["jailHammer","jailhammer","jailh"], conf: "jailHammer", cmdName: "Jail Hammer" },
{ name: ["cmutehammer","cmuteHammer","cmh"], conf: "cmuteHammer", cmdName: "Chat-Mute Hammer" },
{ name: ["vmutehammer","vmuteHammer","vmh"], conf: "vmuteHammer", cmdName: "Voice-Mute Hammer" },
{ name: ["jail","jailRole","jailRole","jailRoles"], conf: "jailRole", cmdName: "Jail Rol" },
{ name: ["yasaklı","yasaklıRole","yasaklıRole","yasaklıRoles"], conf: "yasaklıRole", cmdName: "Yasaklı Tag Rol" },
{ name: ["underworld","doomRole","underworldRole","underworldRole","underworldRoles"], conf: "doomRole", cmdName: "Underworld Rol" },
{ name: ["chatMute","chatmute","chatMuteRole","chatmterole"], conf: "chatMute", cmdName: "Chat-Mute Rol" },
{ name: ["voiceMute","voicemute","voicemuteRole","voicemuterole"], conf: "voiceMute", cmdName: "Voice-Mute Rol" },
{ name: ["fakeAcc","fakeaccrole","fakeAccRole","fakeAccRoles"], conf: "fakeAccRole", cmdName: "Yeni Hesap Rol" },
{ name: ["rolverici","rolvericirole","rolvericiRole","rolvericiRoles"], conf: "rolverici", cmdName: "Rol Yönetici Rol" },
    ]
    
    const setup3 = [
{ name: ["taglırol","familyrole","familyRole","familyRoles"], conf: "ekipRolu", cmdName: "Taglı Rol(leri)" },
{ name: ["boosterrol","boosterrole","boosterRole","boosterRoles"], conf: "boosterRolu", cmdName: "Booster Rol" },
{ name: ["viprol","viprole","vipRole","vipRoles"], conf: "vipRole", cmdName: "Vip Rol" },
{ name: ["müzisyenrol","müzisyenrole","müzisyenRole","müzisyen"], conf: "müzisyenRole", cmdName: "Müziysen Rol" },
{ name: ["tasarımcırol","tasarımcırole","tasarımcıRole","tasarımcı"], conf: "tasarımcıRole", cmdName: "Tasarımcı Rol" },
{ name: ["streamerrol","streamerrole","streamerRole","streamer"], conf: "streamerRole", cmdName: "Streamer Rol" },
{ name: ["sorunçözücürol","sorunçözücürole","sorunçözücüRole","sorunçözücü"], conf: "sorunçözücüRole", cmdName: "Sorun Çözücü Rol" },
{ name: ["terapistrol","terapistrole","terapistRole","terapist"], conf: "terapistRole", cmdName: "Terapist Rol" },
{ name: ["canlıdestekrol","canlıdestekrole","canlıdestekRole","canlıdestek"], conf: "canlıdestekRol", cmdName: "Canlı Destek Rol" },
{ name: ["yetkilialımrol","yetkilialımrole","yetkilialımRole","yetkilialım"], conf: "yetkilialımRol", cmdName: "Yetkili Alım Rol" },
{ name: ["katıldırol","katıldırole","katıldıRole","katıldı"], conf: "Katıldı", cmdName: "Katıldı Rol" },
    ]
    
    const setup4 = [
{ name: ["chat","genelchat","chatChannel","chatchannel"], conf: "chatChannel", cmdName: "Chat Kanal" },
{ name: ["welcome","register","welcomechannel","welcomeChannel"], conf: "teyitKanali", cmdName: "Hoşgeldin Kanal" },
{ name: ["invite","invitekanal","inviteChannel","invitechannel"], conf: "invLogChannel", cmdName: "İnvite Kanal" },
{ name: ["bankanal","banlog","banLogChannel","banlogchannel"], conf: "banLogChannel", cmdName: "Ban Log Kanal" },
{ name: ["fakeLogChannel","fakeLogChannellog","fakeLog","fakelogchannel"], conf: "fakeLogChannel", cmdName: "Fake Log Kanal" },
{ name: ["doomkanal","doomlog","doomLogChannel","doomlogchannel"], conf: "doomLogChannel", cmdName: "Underworld Log Kanal" },
{ name: ["jailkanal","jaillog","jailLogChannel","jaillogchannel"], conf: "jailLogChannel", cmdName: "Jail Log Kanal" },
{ name: ["cmutekanal","cmutelog","cmuteLogChannel","cmutelogchannel"], conf: "cmuteLogChannel", cmdName: "Chat-Mute Log Kanal" },
{ name: ["vmutekanal","vmutelog","vmuteLogChannel","vmutelogchannel"], conf: "vmuteLogChannel", cmdName: "Voice-Mute Log Kanal" },
{ name: ["warnkanal","warnlog","warnLogChannel","warnlogchannel"], conf: "warnLogChannel", cmdName: "Uyarı Log Kanal" },
{ name: ["rules","kurallar","kurallarkanalı","ruleschannel"], conf: "kurallar", cmdName: "Kurallar Kanal" },
{ name: ["cezapuankanal","cezapuanlog","cezapuanLogChannel","cezapuanlogchannel"], conf: "cezapuanlog", cmdName: "Ceza Puan Log Kanal" },
    ]
     
    const setup5 = [
{ name: ["registerParents","registerparents","registerParent","registerparent"], conf: "registerParents", cmdName: "Register Kategori" },
{ name: ["solvingParents","solvingparents","solvingParent","solvingparent"], conf: "solvingParents", cmdName: "Geçersiz Kategori(leri)" },
{ name: ["privateParents","privateparents","privateParent","privateparent"], conf: "privateParents", cmdName: "Secret Kategori" },
{ name: ["aloneParents","aloneparents","aloneParent","aloneparent"], conf: "aloneParents", cmdName: "Alone Kategori" },
{ name: ["funParents","funparents","funParent","funparent"], conf: "funParents", cmdName: "Eğlence Kategori(leri)" },
    ]
    
    const setup6 = [
{ name: ["publicParents","publicparents","publicParent","publicparent"], conf: "publicParents", cmdName: "Public Kategori" },
{ name: ["secretroomParents","secretroomparents","secretroomParent","secretroomparent","secretParent","secretparent"], conf: "secretroomParent", cmdName: "Özel Oda Kategori" },
    ]
    
    setup1.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
let select = args[1];
if (!select) {
message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
return }
global.papazsetupxd.set(`${x.conf}`, `${select}`)
message.reply({ content: `**${select}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
    };
    });
    
    setup2.forEach(async (x) => {
    if(x.name.some(x => x === choose)) {
    const selectMenu = new ActionRowBuilder()
    .addComponents([
new RoleSelectMenuBuilder()
.setCustomId("test")
.setMaxValues(10)
    ]);
    
    let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
    
    const filter = i => i.user.id == message.author.id    
    let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })
    
    xxx.on("collect", async (interaction) => {
const rol = interaction.values;
if(interaction.customId === "test") {
await interaction.deferUpdate();
if(rol) {
let xd = []
rol.map(x => 
xd.push(`${x}`)
)
global.papazsetupxd.set(`${x.conf}`, xd)
msg.edit({ content: `**${x.cmdName}** olarak ${rol.map(x => `<@&${x}>`)} başarıyla eklendi.` , components: [] });
}
}
    })
    };
    });
    
    setup3.forEach(async (x) => {
    if(x.name.some(x => x === choose)) {
    const selectMenu = new ActionRowBuilder()
    .addComponents([
new RoleSelectMenuBuilder()
.setCustomId("test2")
.setMaxValues(1)
    ]);
    
    let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
    
    const filter = i => i.user.id == message.author.id    
    let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })
    
    xxx.on("collect", async (interaction) => {
const rol = interaction.values[0];
if(interaction.customId === "test2") {
await interaction.deferUpdate();
if(rol) {
global.papazsetupxd.set(`${x.conf}`, `${rol}`)
msg.edit({ content: `**${x.cmdName}** olarak <@&${rol}> başarıyla eklendi.` , components: [] });
}
}
    })
    };
    }); 
    
    setup4.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
new ChannelSelectMenuBuilder()
.setCustomId("test3")
.addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
.setMaxValues(1)
]);

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })

xxx.on("collect", async (interaction) => {
const channel = interaction.values[0];
if(interaction.customId === "test3") {
  await interaction.deferUpdate();
  if(channel) {
  global.papazsetupxd.set(`${x.conf}`, `${channel}`)
  msg.edit({ content: `**${x.cmdName}** olarak <#${channel}> başarıyla eklendi.` , components: [] });
}
}
})
};
    }); 
    
    setup5.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
new ChannelSelectMenuBuilder()
.setCustomId("test4")
.addChannelTypes(ChannelType.GuildCategory)
.setMaxValues(10)
]);

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })

xxx.on("collect", async (interaction) => {
const channel = interaction.values;
if(interaction.customId === "test4") {
  await interaction.deferUpdate();
  if(channel) {
    let xd = []
    channel.map(x => 
    xd.push(`${x}`)
    )
  global.papazsetupxd.set(`${x.conf}`, xd)
  msg.edit({ content: `**${x.cmdName}** olarak **${channel.map(x => `<#${channel}>`)}** başarıyla eklendi.` , components: [] });
}
}
})
};
    }); 
    
    setup6.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
new ChannelSelectMenuBuilder()
.setCustomId("test5")
.addChannelTypes(ChannelType.GuildCategory)
.setMaxValues(1)
]);

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })

xxx.on("collect", async (interaction) => {
const channel = interaction.values[0];
if(interaction.customId === "test5") {
  await interaction.deferUpdate();
  if(channel) {
  global.papazsetupxd.set(`${x.conf}`, `${channel}`)
  msg.edit({ content: `**${x.cmdName}** olarak **<#${channel}>** başarıyla eklendi.` , components: [] });
}
}
})
};
    }); 
}
    };
  