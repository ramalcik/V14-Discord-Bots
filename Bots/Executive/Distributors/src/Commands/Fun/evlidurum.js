const Marriage = require("../../../../src/schemas/evlilik");

module.exports = {
    conf: {
        aliases: ["evlilik-durum", "evlidurum", "evlilikbilgi"],
        name: "evlilikdurum",
        help: "evlilikdurum",
        category: "kullanıcı",
    },

    run: async (client, message, args, embed) => {

            // Kullanıcının evlilik kaydını bul
            const marriage = await Marriage.findOne({
                $or: [
                    { husbandID: message.author.id },
                    { wifeID: message.author.id }
                ]
            });

            if (!marriage) {
                return message.channel.send("Henüz evli değilsiniz.");
            }

            // Evliliği bul
            const spouseID = marriage.husbandID === message.author.id ? marriage.wifeID : marriage.husbandID;
            const spouse = await message.guild.members.fetch(spouseID);

            message.channel.send({embeds: [embed.setDescription(`Şu anda ${spouse} ile evlisiniz.`)]
        }
            )
    }
}