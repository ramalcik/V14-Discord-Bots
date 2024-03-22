const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { green,gorevli,red } = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
module.exports = {
  conf: {
    aliases: ["gorevyukselt","gorevupdate","gorevfulle"],
    name: "görevupdate",
    help: "görevupdate",
    category: "owner",
    owner: true,
},

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    )
 
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ content: "Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {
  }

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) {
        return message.reply({ content: "Görevi Fullemek İstediğiniz Kullanıcı Etiketleyin!" });
    }

    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('Görev Fulleme menüsü')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
            label: "Mesaj Görevi",
            value: "mesaj",
            description: "mesaj yazma görevini doldurur.",
          },
          { 
            label: "Taglı Görevi",
            value: "tagli",
            description: "taglı çekme görevini doldurur.",
          },
          { 
            label: "Kayıt Görevi",
            value: "kayit",
            description: "kayıt yapma görevini doldurur.",
          },
          { 
            label: "Yetkili Görevi",
            value: "yetkili",
            description: "yetkili çekme görevini doldurur",
          },
          { 
            label: "Kapat",
            description: "Menüyü kapatır.",
            value: "closeMenu",
          }
        ])
        );


      
       

const papaz = new EmbedBuilder()
.setDescription(`
${member} Kullanıcısının görevini fullemek için menüyü kullanın

\` • \` Doldura bileceğiniz görevler **mesaj/kayıt/yetkili/taglı** 
\` • \` görevleri doldurduğunuz zaman kullanıcının o görev puanını alır.`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [papaz], components : [ row],})
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {

             if(interaction.values[0] == "mesaj") {
            
    member.updateTask(message.guild.id, "mesaj", 1000);
    const ilgi = new EmbedBuilder()
    .setDescription(`${member} Kullanıcısı başarıyla **Mesaj** görevi dolduruldu.`) 

            interaction.update({ embeds: [ilgi], ephemaral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		
                if(interaction.values[0] == "tagli") {
                    member.updateTask(message.guild.id, "tagli", 30);                 
    const süründür = new EmbedBuilder()
    .setDescription(`${member} Kullanıcısı başarıyla **Taglı** görevi dolduruldu.`) 

    interaction.update({ embeds: [süründür], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


    if(interaction.values[0] == "kayit") {
        member.updateTask(message.guild.id, "kayıt", 40);
        const öp = new EmbedBuilder()
        .setDescription(`${member} Kullanıcısı başarıyla **Kayıt** görevi dolduruldu.`)

        interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


        if(interaction.values[0] == "yetkili") {
            member.updateTask(message.guild.id, "yetkili", 40);
            const öp = new EmbedBuilder()
            .setDescription(`${member} Kullanıcısı başarıyla **Yetkili** görevi dolduruldu.`)
                            
            interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}
        

                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                    }
                
                        

                    
                
                })

}
}
