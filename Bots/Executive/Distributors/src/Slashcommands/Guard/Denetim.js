const { PermissionsBitField, AuditLogEvent, ChannelType, ComponentType, SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication, ButtonBuilder, ActionRowBuilder,  StringSelectMenuBuilder, WebhookClient } = require("discord.js");
const Discord = require("discord.js");
const CategoryChannels = require("../../../../../Protection/src/Models/CategoryChannels");
const TextChannels = require("../../../../../Protection/src/Models/TextChannels");
const VoiceChannels = require("../../../../../Protection/src/Models/VoiceChannels");
const RoleModel = require("../../../../../Protection/src/Models/Role");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;
const Bots = require("../../../../../Protection/Backup")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("denetim")
    .setDescription("Son 1 saat de silinmiş 25 Rol/Kanal.")
    .addStringOption(option =>
      option.setName('kategori')
      .setDescription('Silinen son 25 Rol/Kanal')
      .setRequired(true)
      .addChoices(
        { name: "Rol", value: "roles" },
        { name: "Kanal", value: "channels" },
      )),

  async execute(interaction, bot) {
   if(!allah.owners.includes(interaction.user.id)) {
      return interaction.reply({ content: "Yetersiz Yetki.", ephemeral: true })
    }

       const papaz = interaction.options.getString("kategori");
       const guild = client.guilds.cache.get(allah.GuildID);

        if (papaz === "roles") {

            const audit = await guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete }).then(a => a.entries)
            let denetim = []
            const denetim2 = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => 
            denetim.push({
                label: `Rol İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`,
                description: `${e.executor.tag}`,
                value: `${e.target.id}`
            })
            )

            let row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("Silinen Son 25 Rol Listesi")
                .setPlaceholder("Aşağıdan kurmak istediğiniz rolü seçiniz.")
                .addOptions(denetim.reverse().slice(0, 25)),
            )

            if (!denetim2.length) return interaction.reply({ content: `Son 1 saat de silinmiş herhangi bir rol bulunamadı!`, ephemeral: true })
            let arr = '';
            denetim.forEach(element => {
                arr += element + "\n"
            });

          interaction.reply({ content: `Son 1 saat içinde **${denetim.length || 0}** adet rol silinmiş.`, components: [row], ephemeral: true })        

            var filter = (menu) => menu.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
            
            collector.on("collect", async (menu) => {
            const kurulacakRole = menu.values[0]

            if(kurulacakRole) {
            const RoleData = await RoleModel.findOne({ guildID: allah.GuildID, roleID: kurulacakRole });
            if (!RoleData) return menu.reply({ content:"Belirtilen Rol ID'si ile ilgili veri tabanında veri bulunamadı!", ephemeral: true });

            setTimeout(async function(){
                const yeniRol = await interaction.guild.roles.create({
                  name: RoleData.name,
                  color: RoleData.color,
                  hoist: RoleData.hoist,
                  permissions: RoleData.permissions,
                  position: RoleData.position,
                  mentionable: RoleData.mentionable,
                  reason: "Databaseden Yeniden rol açıldı."
                });
                
                setTimeout(() => {
                  let kanalPermVeri = RoleData.channelOverwrites;
                  if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
                    let kanal = interaction.guild.channels.cache.get(perm.id);
                    if (!kanal) return;
                    setTimeout(() => {
                      let yeniKanalPermVeri = {};
                      perm.allow.forEach(p => {
                        yeniKanalPermVeri[p] = true;
                      });
                      perm.deny.forEach(p => {
                        yeniKanalPermVeri[p] = false;
                      });
                      kanal.permissionOverwrites.create(yeniRol, yeniKanalPermVeri).catch(console.error);
                    }, index*5000);
                  });
                }, 5000); 
         
                let length = RoleData.members.length;
                     if (length <= 0) return console.log(`[${yeniRol.id}] Rol kurulumunda kayıtlı üye olmadığından dolayı rol dağıtımı gerçekleştirmedim.`);
menu.reply({ content:`
Başarılı bir şekilde kurulum başladı roller dağıtılıyor kanallara izinleri ekleniyor.
**Aktif İşlem;**
\`\`\`cs
Role sahip ${RoleData.members.length} üye ${Bots.length ? Bots.length : "0"} bot üye olmak üzere rolü destekçiler ile birlikte dağıtmaya başlıyorum
İşlemin biteceği tahmini süre: ${(length>1000 ? parseInt((length*(allah.Guard.Guard.GiveRoleDelay/1000)) / 60)+" dakika" : parseInt(length*(allah.Guard.Guard.GiveRoleDelay/1000))+" saniye")}
\`\`\``, ephemeral: true })
         
                     let availableBots = Bots.filter(e => !e.Busy);
                     if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => y.Uj - x.Uj).slice(0, Math.round(length / Bots.length));
                     let perAnyBotMembers = Math.floor(length / availableBots.length);
                     if (perAnyBotMembers < 1) perAnyBotMembers = 1;
                     for (let index = 0; index < availableBots.length; index++) {
                         const bot = availableBots[index];
                         let ids = RoleData.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
                         if (ids.length <= 0) { client.processBot(bot, false, -perAnyBotMembers); break; }
                         let guild = bot.guilds.cache.get(allah.GuildID); 
                         ids.every(async id => {
                        let member = guild.members.cache.get(id);
                        if(!member){
                         console.log(`[${kurulacakRole}] Rol Kurulumundan sonra ${bot.user.username} - ${id} adlı üyeyi sunucuda bulamadım.`);
                         return true;}
                         await member.roles.add(yeniRol.id).then(e => {console.log(`[${kurulacakRole}] Rol kurulumundan sonra ${bot.user.tag} - ${member.user.username} adlı üye ${yeniRol.name} rolünü aldı.`);}).catch(e => {console.log(`[${yeniRol.id}] Olayından sonra ${bot.user.username} - ${member.user.username} adlı üyeye rol veremedim.`);});});
                         client.processBot(bot, false, -perAnyBotMembers); }
          
                         client.channels.cache.find(x => x.name == "protection_log").send({ content:`${interaction.user} (\`${interaction.user.id}\`) kullanıcısı\n<#${interaction.channel.id}> (\`${interaction.channel.id}\`) kanalında \`/rol-kur\` komutu kullandı.\nKomut İçeriği: **${RoleData.name}** - (\`${RoleData.roleID}\`) rolün yedeğini kurmaya başladı.\n──────────────────────────`})
                   }, 450)      
            }
        })
        } else if (papaz === "channels") {

            const audit = await guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(a => a.entries)
            let denetim = []
            const denetim2 = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => 
            denetim.push({
                label: `Kanal İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`,
                description: `${e.executor.tag}`,
                value: `${e.target.id}`
            })
            )
            
            let row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("Silinen Son 25 Kanal Listesi")
                .setPlaceholder("Aşağıdan kurmak istediğiniz kanalı seçiniz.")
                .addOptions(denetim.reverse().slice(0, 25)),
            )
            if (!denetim2.length) return interaction.reply({ content: `Son 1 saat de silinmiş herhangi bir kanal bulunamadı!`, ephemeral: true })
            let arr = '';
            denetim.forEach(element => {
                arr += element + "\n"
            });

            interaction.reply({ content: `Son 1 saat içinde **${denetim.length || 0}** adet kanal silinmiş.`, components: [row], ephemeral: true })    
            var filter = (menu) => menu.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
            
            collector.on("collect", async (menu) => {
            const kurulacakChannel = menu.values[0]

            if(kurulacakChannel) {
                const tdata = await TextChannels.findOne({ channelID: kurulacakChannel });
                const vdata = await VoiceChannels.findOne({ channelID: kurulacakChannel });
                const cdata = await CategoryChannels.findOne({ channelID: kurulacakChannel });
          
                if (tdata) {
                  newChannel = await interaction.guild.channels.create({ name: tdata.name, 
                      type: ChannelType.GuildText,
                      nsfw: tdata.nsfw,
                      parent: tdata.parentID,
                      position: tdata.position + 1,
                      rateLimitPerUser: tdata.rateLimit
                    })
                    await menu.reply({ content: `**${newChannel.name}** isimli Yazı Kanalının yedeği kuruluyor ve rol izinleri entegre ediliyor`, ephemeral: true })
                    const newOverwrite = [];
                    for (let index = 0; index < tdata.overwrites.length; index++) {
                      const veri = tdata.overwrites[index];
                      newOverwrite.push({
                        id: veri.id,
                        allow: new PermissionsBitField(veri.allow).toArray(),
                        deny: new PermissionsBitField(veri.deny).toArray()
                      });
                    }
                    await newChannel.permissionOverwrites.set(newOverwrite);
                    tdata.channelID = newChannel.id
                    tdata.save()
                return } else if (vdata) {
                  newChannel = await interaction.guild.channels.create({ name: vdata.name, 
                    type: ChannelType.GuildVoice,
                    bitrate: vdata.bitrate,
                    userLimit: vdata.userLimit,
                    parent: vdata.parentID,
                    position: vdata.position
                  })
                  await menu.reply({ content: `**${newChannel.name}** isimli Ses Kanalının yedeği kuruluyor ve rol izinleri entegre ediliyor`, ephemeral: true })
                  const newOverwrite = [];
                  for (let index = 0; index < vdata.overwrites.length; index++) {
                    const veri = vdata.overwrites[index];
                    newOverwrite.push({
                      id: veri.id,
                      allow: new PermissionsBitField(veri.allow).toArray(),
                      deny: new PermissionsBitField(veri.deny).toArray()
                    });
                  }
                  await newChannel.permissionOverwrites.set(newOverwrite);
                  vdata.channelID = newChannel.id
                  vdata.save()
              return } else if (cdata) {
                  const newChannel = await interaction.guild.channels.create({ name: cdata.name, 
                    type: ChannelType.GuildCategory,
                    position: cdata.position + 1,
                  });
                  await menu.reply({ content: `**${newChannel.name}** isimli kategori yedeği kuruluyor ve kanallar içine aktarılıyor`, ephemeral: true })
                  const textChannels = await TextChannels.find({ parentID: kurulacakChannel });
                  await TextChannels.updateMany({ parentID: kurulacakChannel }, { parentID: newChannel.id });
                  textChannels.forEach(c => {
                    const textChannel = interaction.guild.channels.cache.get(c.channelID);
                    if (textChannel) textChannel.setParent(newChannel, { lockPermissions: false });
                  });
                  const voiceChannels = await VoiceChannels.find({ parentID: kurulacakChannel });
                  await VoiceChannels.updateMany({ parentID: kurulacakChannel }, { parentID: newChannel.id });
                  voiceChannels.forEach(c => {
                    const voiceChannel = interaction.guild.channels.cache.get(c.channelID);
                    if (voiceChannel) voiceChannel.setParent(newChannel, { lockPermissions: false });
                  });
                  const newOverwrite = [];
                  for (let index = 0; index < cdata.overwrites.length; index++) {
                    const veri = cdata.overwrites[index];
                    newOverwrite.push({
                      id: veri.id,
                      allow: new PermissionsBitField(veri.allow).toArray(),
                      deny: new PermissionsBitField(veri.deny).toArray()
                    });
                  }
                  await newChannel.permissionOverwrites.set(newOverwrite);
                  cdata.channelID = newChannel.id
                  cdata.save()
              return }
              if (!tdata || !vdata || !cdata) return menu.reply({ content: "Belirtilen kanal ID'sine ait veri bulunamadı!", ephemeral: true }) 
            }
        })       
    }
}
};