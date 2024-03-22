const db = require("../../../../src/schemas/chatGSchema")

module.exports = {
    conf: {
      aliases: ["metin","mesaj","filtre"],
      name: "metin",
      help: "metin <papaz/ID>",
      category: "owner",
      owner: true,
    },

  run: async (client, message, args, embed, prefix) => {


    if (!args[0]) return message.channel.send(':x: Örnek kullanım: filtre ekle/kaldır kelime').catch(() => {});
   
        if (args[0] === 'ekle' || args[0] === 'add' ) {
            if (!args[1]) return message.channel.send(':x: Örnek kullanım: filtre ekle/kaldır kelime').catch(() => {});
            const Database = await db.findOne({ ServerID: message.guild.id });    
            if (Database && Database.FiltredWords.includes(args[1]) === true) return message.channel.send('**'+args[1]+'**, Bu kelime zaten filtre\'de var.').catch(() => {});

            await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { FiltredWords: args[1] } }, { upsert: true });
            return message.channel.send(embed.setDescription('**'+args[1]+'**, Başarıyla filtre\'ye eklendi.')).catch(() => {});
        }
   
        if (args[0] === 'kaldır' || args[0] === 'remove' ) {
            if (!args[1]) return message.channel.send(':x: Örnek kullanım: filtre ekle/kaldır kelime').catch(() => {});
            const Database = await db.findOne({ ServerID: message.guild.id });    
            if (!Database || Database.FiltredWords.includes(args[1]) !== true) return message.channel.send('**'+args[1]+'**, Bu kelime zaten filtre\'de değil.').catch(() => {});
           
            await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { FiltredWords: args[1] }});
            return message.channel.send('**'+args[1]+'**, Başarıyla filtre\'den kaldırıldı.').catch(() => {}); }
    }

}
