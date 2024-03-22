const { EmbedBuilder } = require("discord.js");
const Bakiye = require('../../../../src/schemas/dinar'); // Bakiye modelini içeri aktar

module.exports = {
    conf: {
      aliases: ["paraekle"],
      name: "paraekle",
      help: "paraekle",
      category: "owner",
      owner: true,
    },
    run: async (client, message, args, embed, prefix) => {

    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Lütfen bir kullanıcı belirtin!");
    let amount = args[1];
    if (!amount || isNaN(amount)) return message.reply("Lütfen bir miktar belirtin!");
    
    // Kullanıcıya para eklemek için MongoDB'yi güncelle
    let userData = await Bakiye.findOneAndUpdate(
        { userId: user.id },
        { $inc: { bakiyeMiktarı: parseInt(amount) } },
        { new: true, upsert: true }
    );

    const embeds = new EmbedBuilder()
        .setTitle(`Para Eklendi!`)
        .setDescription(`Kullanıcı: <@${user.id}>\nVerilen Bakiye: ${amount} 💸\nToplam Tutar: ${userData.bakiyeMiktarı}`)
        .setThumbnail(user.displayAvatarURL())
            
        await message.channel.send({ embeds: [embeds] });
}
}
