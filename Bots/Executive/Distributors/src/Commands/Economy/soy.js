const Bakiye = require('../../../../src/schemas/dinar');

module.exports = {
    conf: {
      aliases: ["soy"],
      name: "soy",
      help: "soy",
      category: "kullanıcı",
    },
  
    
run: async (client, message, args, embed, prefix) => {
    try {
        // Sunucunun kimliğini al
        const guildId = message.guild.id;

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply("Kimden soyacağını belirtmelisin.");

        let messages = [
            `${target} soymaya çalışırken tökezledin ve yakalandın!`,
            `Sinsileşiyorsun ha? ${target} polisleri aradı!`,
            `Ramalın elini öpmediğiniz için ${target} soygununu gerçekleştiremediniz`
        ];

        let amount = Math.floor(Math.random() * 50) + 10;

        // Kullanıcının bakiye bilgilerini MongoDB'den çekme
        let bakiye = await Bakiye.findOne({ userId: message.author.id, guildId: guildId });
        if (!bakiye) {
            // Eğer kullanıcı bakiye bilgisine sahip değilse, varsayılan olarak 0 bakiye varsayalım
            bakiye = await Bakiye.create({ userId: message.author.id, guildId: guildId, bakiyeMiktarı: 0 });
        }

        // Soygun işlemini gerçekleştirme ve sonrasında bakiye miktarını almak
        const rob = {
            amount: amount,
            onCooldown: false,
            lost: Math.random() < 0.5 // %50 şansla kaybetme
        };

        if (rob.onCooldown) return message.reply(`Yakın zamanda birini soymaya çalıştınız, ${rob.time.seconds} saniye sonra tekrar deneyin.`);
        if (rob.lost) return message.channel.send(messages[Math.floor(Math.random() * messages.length)]);

        // Hedefin bakiyesini güncelleme
        let targetBakiye = await Bakiye.findOne({ userId: target.id, guildId: guildId });
        if (!targetBakiye) {
            targetBakiye = await Bakiye.create({ userId: target.id, guildId: guildId, bakiyeMiktarı: 0 });
        }
        targetBakiye.bakiyeMiktarı -= rob.amount;
        await targetBakiye.save();

        // Soygun yapana bakiye ekleme
        bakiye.bakiyeMiktarı += rob.amount;
        await bakiye.save();

        return message.reply(`**${rob.amount}** 💸 için ${target} soydunuz. Artık **${bakiye.bakiyeMiktarı}** 💸 var.`);
    } catch (err) {
        console.error("Hata oluştu:", err);
        return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    }
}
}