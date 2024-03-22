const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const RoleModel = require("../../../../../Protection/src/Models/Role");
const SafeMember = require("../../../../../Protection/src/Models/Safe");
const CategoryChannels = require("../../../../../Protection/src/Models/CategoryChannels");
const TextChannels = require("../../../../../Protection/src/Models/TextChannels");
const VoiceChannels = require("../../../../../Protection/src/Models/VoiceChannels");
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup")
    .setDescription("Sunucu içindeki kanal ve rol verilerini kaydedersiniz."),

  async execute(interaction, bot) {
    if(!allah.owners.includes(interaction.user.id)) {
      return interaction.reply({ content: "Yetersiz Yetki", ephemeral: true })
    }

    
    const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Backup Sayfasın da Kapat/aç Menüsü')
        .addOptions([
          {
            label: 'Sunucu Genel Veri.',
            description: "Sunucu içeresinde Genel Veri Alırsın.",
            emoji: "966452273813287022",
            value: 'Server',
          },
          {
            label: 'Sunucu Yetkili Veri.',
            description: "Sunucu içeresinde Genel Yetkili Veri Alırsın,",
            emoji: "966452273813287022",
            value: 'Yetki',
          },
          {
            label: 'Sunucu Rol Veri.',
            description: "Sunucu içeresinde Genel Rol Verisi Alırsın.",
            emoji: "966452273813287022",
            value: 'Roles',
          },
          {
            label: 'Sunucu Kanal Veri.',
            description: "Sunucu içeresinde Genel Kanal verisi Alırsın.",
            emoji: "966452273813287022",
            value: 'Channel',
          },
          {
            label: 'İptal',
            description: "Menü Kapatmak için Menüden Seçim Yapın.",
            emoji: "966452273813287022",
            value: 'Cancel',
          },

        ])
    );
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setDescription(`${interaction.member.toString()} sunucusunda kanal ve rol verilerini kaydetmek için aşağıdaki butonları kullanabilirsiniz.`)
      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Sunucu
\`\`\`
Sunucudaki Tüm (Rol/Kanal/Yetki) Verilerini Database Kayıt Eder.
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Yetki
\`\`\`
Sunucudaki Yetkilerin Verilerini Database Kayıt Eder.
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Rol
\`\`\`
Sunucudaki Rollerin Verilerini Database Kayıt Eder.
`, inline: true
        },
      )

      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Kanal
\`\`\`
Sunucudaki Kanalların Verilerini Database Kayıt Eder.
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
İptal
\`\`\`
Sunucu Verilerini Database Kayıt Etme İşlemini İptal Eder.
`, inline: true
        },
      )
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))

    interaction.reply({ embeds: [embed], components: [row] })


    const filter = i => i.user.id == interaction.user.id 
    const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
    collector.on("collect", async (interaction) => {

      if (interaction.values[0] === "Server") {
      const izinler = [
        PermissionsBitField.Flags.Administrator
    ]
    const data = [];

        interaction.guild.roles.cache.filter(rol => izinler.some(rol2 => rol.permissions.has(rol2)) && !rol.managed).forEach(role => {
          data.push({ id: role.id })
        })
        await SafeMember.updateOne({ guildID: interaction.guild.id }, { $set: { Permissions: data } }, { upsert: true });
        rolbackup();
        kanalbackup();

        const ytembed = new EmbedBuilder()
          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`${interaction.guild.name} sunucusundaki **Sunucu verileri** kaydedildi.\n\n**Kayıt Edilen Yetkiler:** \n\n${data.map(x => `<@&${x.id}>`).join("\n")}`)
  
      interaction.update({ embeds: [ytembed], components: [] })
    }

      if (interaction.values[0] === "Yetki") {
      const izinler = [
        PermissionsBitField.Flags.Administrator
    ]
    const data = [];

        interaction.guild.roles.cache.filter(rol => izinler.some(rol2 => rol.permissions.has(rol2)) && !rol.managed).forEach(role => {
          data.push({ id: role.id })
        })
        await SafeMember.updateOne({ guildID: interaction.guild.id }, { $set: { Permissions: data } }, { upsert: true });
  
        const ytembed = new EmbedBuilder()
          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`${interaction.guild.name} sunucusundaki **Yetki verileri** kaydedildi.\n\n**Kayıt Edilen Yetkiler:** \n\n${data.map(x => `<@&${x.id}>`).join("\n")}`)
  
      interaction.update({ embeds: [ytembed], components: [] })
    }

      if (interaction.values[0] === "Roles") {
      rolbackup();
      interaction.update({ content: `${interaction.guild.name} sunucusundaki rol verileri başarıyla kaydedildi.`, embeds: [], components: [] })
    }

      if (interaction.values[0] === "Channel") {
      kanalbackup();
      interaction.update({ content: `${interaction.guild.name} sunucusundaki kanal verileri başarıyla kaydedildi.`, embeds: [], components: [] })
    }

      if (interaction.values[0] === "Cancel") {
      interaction.update({ content: `İşlem başarıyla iptal edildi.`, embeds: [], components: [] })
    }

})
}};


async function rolbackup() {
if(RoleModel) {await RoleModel.deleteMany({});}

const guild = bot.guilds.cache.get(allah.GuildID);
let members = await guild.members.fetch();
guild.roles.cache.filter(e => e.name !== "@everyone" && !e.managed).forEach(async role => {
    let roleChannelOverwrites = [];
    await guild.channels.cache.filter(c => c.permissionOverwrites?.cache.has(role.id)).forEach(c => {
        let channelPerm = c.permissionOverwrites.cache.get(role.id);
        let pushlanacak = {
            id: c.id,
            allow: channelPerm.allow.toArray(),
            deny: channelPerm.deny.toArray()
        };
        roleChannelOverwrites.push(pushlanacak);
    });

      await RoleModel.updateOne({
          roleID: role.id
      }, {
          $set: {
              guildID: guild.id,
              roleID: role.id,
              name: role.name,
              color: role.hexColor,
              hoist: role.hoist,
              position: role.position,
              permissions: role.permissions.bitfield,
              mentionable: role.mentionable,
              time: Date.now(),
              members: role.members.map(m => m.id),
              channelOverwrites: roleChannelOverwrites
          }
      }, {
          upsert: true
      });
  });

};


async function kanalbackup() {
if(TextChannels) {await TextChannels.deleteMany({});}
if(VoiceChannels) {await VoiceChannels.deleteMany({});}
if(CategoryChannels) {await CategoryChannels.deleteMany({});}

  const guild = bot.guilds.cache.get(allah.GuildID);
  if (guild) {
    const channels = [...guild.channels.cache.filter(kanal => kanal.deleted !== true).values()];
    for (let index = 0; index < channels.length; index++) {
          const channel = channels[index];
          let ChannelPermissions = []
          channel.permissionOverwrites?.cache.forEach(perm => {
              ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
          });
        
          if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
            await TextChannels.updateOne({
                channelID: channel.id,
            }, {
                $set: {
                    channelID: channel.id,
                    name: channel.name,
                    nsfw: channel.nsfw,
                    parentID: channel.parentId,
                    position: channel.position,
                    rateLimit: channel.rateLimitPerUser,
                    overwrites: ChannelPermissions,
                }
            }, {
                upsert: true
            });
          }
          if (channel.type === ChannelType.GuildVoice) {
            await VoiceChannels.updateOne({
                channelID: channel.id,
            }, {
                $set: {
                    channelID: channel.id,
                    name: channel.name,
                    bitrate: channel.bitrate,
                    userLimit: channel.userLimit,
                    parentID: channel.parentId,
                    position: channel.position,
                    overwrites: ChannelPermissions,
                }
            }, {
                upsert: true
            });
          }
          if (channel.type === ChannelType.GuildCategory) {
            await CategoryChannels.updateOne({
                channelID: channel.id,
            }, {
                $set: {
                    channelID: channel.id,
                    name: channel.name,
                    position: channel.position,
                    overwrites: ChannelPermissions,
                }
            }, {
                upsert: true
            });
          }
      }
      const channel = bot.channels.cache.find(x => x.name == "databese_log");
      channel.wsend(`
Bütün Kanal verileri kayıt etdim. <a:dino:1118980623256784916> 
Bütün Rol verileri kayıt etdim. <a:dino:1118980623256784916> `)
  }}