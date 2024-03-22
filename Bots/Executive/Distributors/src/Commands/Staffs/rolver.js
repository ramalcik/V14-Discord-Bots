const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, RoleSelectMenuBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["rolver","rol-ver","r"],
    name: "rolver",
    help: "rolver <papaz/ID> <Role/ID>",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.rolverici.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.reply({ content:`Malesef yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply({ content: "Lütfen bir üye belirtin." });

const selectMenu = new ActionRowBuilder()
.addComponents([
new RoleSelectMenuBuilder()
.setCustomId("test2")
.setMaxValues(1)
    ]);

    const selectEmbed = new EmbedBuilder()
      .setDescription(`Aşağıdaki menüden ${member} adlı kullanıcıya yapacağınız işlemi seçin.
      
      NOT: Eğer belirttiğiniz rol kullanıcıda varsa rolü çeker veya bir yönetici rolü veremezsiniz.`);

    const selectMessage = await message.reply({ embeds: [selectEmbed], components: [selectMenu] });

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = selectMessage.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'test2') {
        const selectedRoleId = interaction.values[0];
        const selectedRole = message.guild.roles.cache.get(selectedRoleId);
    
        if (!selectedRole) return interaction.reply({ content: "Seçilen rol bulunamadı." });
    
        // Kontrol edilecek kısım başlıyor
        if (selectedRole.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return interaction.reply({ content: "Seçilen rol bir yönetici rolü olduğu için işlem yapılamaz." });
        }
        // Kontrol edilecek kısım bitiyor
    
        if (member.roles.cache.has(selectedRoleId)) {
          await member.roles.remove(selectedRole);
          interaction.reply({ content: `${member} adlı kullanıcıya ${selectedRole.name} rolü alındı.` });
        } else {
          await member.roles.add(selectedRole);
          interaction.reply({ content: `${member} adlı kullanıcıya ${selectedRole.name} rolü verildi.` });
        }
      }
    });
  }
}    