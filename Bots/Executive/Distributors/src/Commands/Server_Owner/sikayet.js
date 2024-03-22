const { Client, Message, EmbedBuilder } = require("discord.js");
const { green } = require("../../../../src/configs/emojis.json")
module.exports = {
    conf: {
    aliases: ["sikayetet"],
    name: "sikayet",
    help: "sikayet",
    category: "owner",
    },
      
    run: async (client, message, args) => {
   
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send("\`.sikayet <@ramal/ID> <chat-sesli-taciz-dm> <Şikayet Açıklaması>\`")
    if(uye.user.bot) return message.channel.send("\`BOT ÜYE\` bu üye üzerinde hiç bir şekilde işlem yapamazsın.");
    if(message.author.id === uye.id) return message.channel.send("\`Aynı Üye\` Lütfen Kendi üzerine işlem uygulamaya çalışma!")

    let tür = args[1];
    if(tür !== "chat" && tür !== "sesli" && tür !== "taciz" && tür !== "dm") return message.channel.send("\`.sikayet <@ramal/ID> <chat-sesli-taciz-dm> <Şikayet Açıklaması>\`")
    let şikayetbilgi = args.slice(2).join(' ');
    if(!şikayetbilgi) return message.channel.send("\`.sikayet <@ramal/ID> <chat-sesli-taciz-dm> <Şikayet Açıklaması>\`")
    message.react(green);
    message.channel.send(`Şikayetiniz yetkililere başarıyla iletilmiştir en kısa zamanda sonuçlandırılacaktır.`).then(x => {
        let sikiminkafasi = new EmbedBuilder()
            .setDescription(`${uye} kişisi ${message.author} tarafından **${tür}** türü nedeniyle şikayet edildi.
            __**Şikayetçi**__
            
            ID: \`${message.author.id}\`
            Profil: ${message.author}
            __**Şikayet Edilen**__
            
            ID: \`${uye.id}\`
            Profil: ${uye}
            
            __**Şikayet Bilgisi**__
            
            Şikayet Türü: \`${tür}\`
            Şikayet Tarihi: \`${tarihsel(Date.now())}\`
            
            __**Şikayet Açıklaması**__
            
            \`${şikayetbilgi}\`
            `);
    
        if (client.channels.cache.find(c => c.name === "sikayet")) {
            client.channels.cache.find(c => c.name === "sikayet").send({ embeds: [sikiminkafasi] });
        }
    });
}
}