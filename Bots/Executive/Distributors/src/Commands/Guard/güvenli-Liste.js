const Discord = require("discord.js");
const settings = require("../../../../../../config.json");
const SafeMember = require("../../../../../Protection/src/Models/Safe")
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const { PermissionsBitField } = require("discord.js")
module.exports = {
  conf: {
    aliases: ["gliste","güvenliliste","papazcimliste"],
    name: "güvenliliste",
    help: "güvenliliste",
    category: "Sahip",
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
let papazGuardiSikiyor = await SafeMember.findOne({ guildID: message.guild.id });
if(args[0] == "full" || args[0] == "yardim") {
   
var msg = await message.channel.send({embeds: [embed.setFooter({text: "NOT: Full güvenlisine sadece sizin güvendiğiniz kişileri ekleyin!"}).setDescription(`Full Listesinden Silindi
`)], components: []})

var filter = (button) => button.user.id === message.author.id;
let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })  
collector.on("collect", async (button) => {                     
if(button.values[0] === "guild") {
await button.deferUpdate();
let messages   
messages = `
\`\`\`Full Güvenli Listesi\`\`\`
${papazGuardiSikiyor && papazGuardiSikiyor.Full && papazGuardiSikiyor.Full.length > 0 ? `Güvenli Listede \`${papazGuardiSikiyor.Full.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+papazGuardiSikiyor.Full.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}
`  
if(msg) msg.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] == "rol") {  
await button.deferUpdate();
let messages  
messages = `
`
if(msg) msg.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] == "kanal") {
await button.deferUpdate();
let messages
messages = `
`
if(msg) msg.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] == "roleselect") {
await button.deferUpdate();
let messages 
messages = `
`
if(msg) msg.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] == "level") {
await button.deferUpdate();
let messagess 
messagess = `
`
if(msg) msg.edit({embeds: [embed.setDescription(messagess)]}).catch(e => {})
}
if(button.values[0] === "kapat") {
msg.delete().catch(e => {})  
}  
          })
} else if(!args[0]) {
const rows = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.StringSelectMenuBuilder()
        .setPlaceholder("Bir işlem seçiniz!")
        .setCustomId("kurulum")
        .setOptions([
            {value:"Full",description:"Full e eklenen kişileri göre bilirsin.", label:"Full Liste",emoji:{id:"1139683150713327638"}},
            {value:"RoleAndChannel",description:"RoleAndChannel e eklenen kişileri göre bilirisn.", label:"RoleAndChannel Liste",emoji:{id:"1139683150713327638"}},
            {value:"Channel",description:"Channel e eklenen kişileri göre bilirsin.", label:"Channel Liste",emoji:{id:"1139683150713327638"}},
            {value:"Role",description:"Role eklenen kişileri görebilirsin.", label:"Role Liste",emoji:{id:"1139683150713327638"}},
            {value:"ChatGuard",description:"ChatGuard a eklenen kişileri göre bilirsin.", label:"ChatG Liste",emoji:{id:"1139683150713327638"}},			
            {value:"kapat",label:"Kapat",emoji:{id:"1137686658779709522"}},
           ])
    )  
var msj = await message.channel.send({embeds: [embed.setDescription(`${message.member}, Merhaba Koruma Botunda ki güvenliye aldığınız kişileri menü yardımı ile göre bilirsiniz.`).setFooter({text: `NOT: Full güvenlisine sadece sizin güvendiğiniz kişileri ekleyin!`})], components: [rows]})
var filter = (button) => button.user.id === message.author.id;
let collector = await msj.createMessageComponentCollector({ filter, time: 60000 })  
collector.on("collect", async (button) => {                     
if(button.values[0] === "Full") {
await button.deferUpdate();
let messages   
messages = `\`\`\`Full Güvenli Listesi\`\`\`
${papazGuardiSikiyor && papazGuardiSikiyor.Full && papazGuardiSikiyor.Full.length > 0 ? `Güvenli Listede \`${papazGuardiSikiyor.Full.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+papazGuardiSikiyor.Full.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}
`
if(msj) msj.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] === "RoleAndChannel") {
await button.deferUpdate();
let messages   
messages = `\`\`\`ROLEANDCHANNEL\`\`\`
${papazGuardiSikiyor && papazGuardiSikiyor.RoleAndChannel && papazGuardiSikiyor.RoleAndChannel.length > 0 ? `Güvenli Listede \`${papazGuardiSikiyor.RoleAndChannel.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+papazGuardiSikiyor.RoleAndChannel.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}
`
if(msj) msj.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] === "Channel") {
await button.deferUpdate();
let messages   
messages = `\`\`\`CHANNEL\`\`\`
${papazGuardiSikiyor && papazGuardiSikiyor.Channel && papazGuardiSikiyor.Channel.length > 0 ? `Güvenli Listede \`${papazGuardiSikiyor.Channel.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+papazGuardiSikiyor.Channel.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}
`
if(msj) msj.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] === "Role") {
await button.deferUpdate();
let messages   
messages = `\`\`\`ROLE\`\`\`
${papazGuardiSikiyor && papazGuardiSikiyor.Role && papazGuardiSikiyor.Role.length > 0 ? `Güvenli Listede \`${papazGuardiSikiyor.Role.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+papazGuardiSikiyor.Role.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}
`
if(msj) msj.edit({embeds: [embed.setDescription(messages)]}).catch(e => {})
}
if(button.values[0] === "ChatGuard") {
await button.deferUpdate();
let messagess  
messagess = `
\`\`\`CHAT GUARD\`\`\`
${papazGuardiSikiyor && papazGuardiSikiyor.ChatG && papazGuardiSikiyor.ChatG.length > 0 ? `Güvenli Listede \`${papazGuardiSikiyor.ChatG.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+papazGuardiSikiyor.ChatG.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}
`
if(msj) msj.edit({embeds: [embed.setDescription(messagess)]}).catch(e => {})
}
if(button.values[0] === "kapat") {
msj.delete().catch(e => {})  
}    

		}  
					

  
)
	}
}
}
    
