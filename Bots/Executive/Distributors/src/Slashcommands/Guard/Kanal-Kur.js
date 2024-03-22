const { ChannelType, SlashCommandBuilder, WebhookClient, PermissionsBitField } = require("discord.js");
const allah = require("../../../../../../config.json");
const CategoryChannels = require("../../../../../Protection/src/Models/CategoryChannels");
const TextChannels = require("../../../../../Protection/src/Models/TextChannels");
const VoiceChannels = require("../../../../../Protection/src/Models/VoiceChannels");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("kanal-kur")
      .setDescription("Silinen Ses/Yazı/Kategori Kanal Kurulumunu Gerçekleştirebilirsiniz.")
      .addStringOption((option) =>
      option.setName("id")
        .setDescription("Yüklenecek <kanal/kategori> belirtiniz.")
        .setRequired(true),
    ),
    async execute(interaction, bot) {
      if(!allah.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: "Yetersiz Yetki.", ephemeral: true })
      }

      var victim = interaction.options.getString("id");

      const tdata = await TextChannels.findOne({ channelID: victim });
      const vdata = await VoiceChannels.findOne({ channelID: victim });
      const cdata = await CategoryChannels.findOne({ channelID: victim });

      if (tdata) {
        newChannel = await interaction.guild.channels.create({ name: tdata.name,
            type: ChannelType.GuildText,
            nsfw: tdata.nsfw,
            parent: tdata.parentID,
            position: tdata.position,
            rateLimitPerUser: tdata.rateLimit
          })
          newChannel.setPosition(tdata.position)
          await interaction.reply({ content: `**${newChannel.name}** isimli Yazı Kanalının yedeği kuruluyor ve rol izinleri entegre ediliyor`, ephemeral: true })
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
        newChannel.setPosition(vdata.position)
        await interaction.reply({ content: `**${newChannel.name}** isimli Ses Kanalının yedeği kuruluyor ve rol izinleri entegre ediliyor`, ephemeral: true })
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
        newChannel.setPosition(cdata.position)
        await interaction.reply({ content: `**${newChannel.name}** isimli kategori yedeği kuruluyor ve kanallar içine aktarılıyor`, ephemeral: true })
        const textChannels = await TextChannels.find({ parentID: victim });
        await TextChannels.updateMany({ parentID: victim }, { parentID: newChannel.id });
        textChannels.forEach(c => {
          const textChannel = interaction.guild.channels.cache.get(c.channelID);
          if (textChannel) textChannel.setParent(newChannel, { lockPermissions: false });
        });
        const voiceChannels = await VoiceChannels.find({ parentID: victim });
        await VoiceChannels.updateMany({ parentID: victim }, { parentID: newChannel.id });
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
    if (!tdata || !vdata || !cdata) return interaction.reply({ content: "Belirtilen kanal ID'sine ait veri bulunamadı!", ephemeral: true }) 
    },
};