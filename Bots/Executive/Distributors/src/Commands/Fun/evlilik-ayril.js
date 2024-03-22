const { EmbedBuilder } = require("discord.js");
const Marriage = require("../../../../src/schemas/evlilik");

module.exports = {
    conf: {
        aliases: ["ayril", "boşan"],
        name: "ayril",
        help: "ayril",
    },

    run: async (client, message, args) => {
        // Evlilik kaydını bul
        const marriage = await Marriage.findOne({
            $or: [
                { husbandID: message.author.id },
                { wifeID: message.author.id }
            ]
        });

        if (!marriage) return message.channel.send("Zaten evli değilsiniz.");

        // Evliliği sonlandır
        await Marriage.findByIdAndDelete(marriage._id);

        // Evlileri belirleme
        const husband = await message.guild.members.fetch(marriage.husbandID);
        const wife = await message.guild.members.fetch(marriage.wifeID);

        // Evli rollerini kaldırma
        const role = message.guild.roles.cache.find(role => role.name === "Evliler");
        if (role) {
            husband.roles.remove(role);
            wife.roles.remove(role);
        }

        message.channel.send(`${husband} ve ${wife}, evliliklerini sonlandırdılar.`);
    },
};
