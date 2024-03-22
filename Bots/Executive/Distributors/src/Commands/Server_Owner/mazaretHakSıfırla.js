const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Excuse = require("../../../../src/schemas/mazaret");
const conf = require("../../../../src/configs/sunucuayar.json");

module.exports = {
    conf: {
        aliases: ["mazeretsil", "excusedelete"],
        name: "mazaretSil",
        help: "mazaretSil <mazaretID>",
        category: "yetkili",
    },

    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("Bu komutu kullanma yetkiniz yok.");
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Lütfen bir kullanıcı etiketleyin veya ID'sini belirtin.");

        try {
            const deletedExcuse = await Excuse.findOneAndDelete({ authorID: member.id, guildID: message.guild.id });
            if (!deletedExcuse) return message.channel.send("Belirtilen kullanıcının mazereti bulunamadı.");

            const ramal31 = new EmbedBuilder()
            .setDescription(`
            ${member} adlı kullanıcının mazereti sıfırlanmıştır eski mazeret bilgileri
            aşağıda bulunmaktadır.
            
            \` Silinen Kullanıcı : \` ${member}
            
            \` Silinen Mazeret : \` ${deletedExcuse.excuse}`)

        message.channel.send({ embeds: [ramal31] });

        
        } catch (error) {
            console.error("Mazeret silinirken bir hata oluştu:", error);
            message.channel.send("Mazeret silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        }
    
    
    }
}
