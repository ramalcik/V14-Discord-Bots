const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { green, red} = require("../../../src/configs/emojis.json")
const allah = require("../../../../../config.json");
const özelPerms = require("../../../src/schemas/talentPerms");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const client = global.bot;

module.exports = async (message) => {

    if (!message.guild || message.channel.type === "dm") return;
    let data = await özelPerms.find({ guildID: message.guild.id }) || [];
    let ozelkomutlar = data;
    let yazilanKomut = message.content.split(" ")[0];
    let args = message.content.split(" ").slice(1);
    yazilanKomut = yazilanKomut.slice(allah.Main.prefix.some(x => x.length));
    let komut = ozelkomutlar.find(x => x.komutAd.toLowerCase() === yazilanKomut);
    if (!komut) return;

    let channel = client.channels.cache.find(x => x.name == komut.kullanımKanal);

    let verilenRol = message.guild.roles.cache.some(rol => komut.verilecekRol.includes(rol.id));
    if (!verilenRol) return;

    let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (message.member.roles.cache.some(rol => komut.YetkiliRol.includes(rol.id)) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        if (!üye) return message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Lütfen rol verilecek kişiyi etiketle.`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
        if (!komut.verilecekRol.some(rol => üye.roles.cache.has(rol))) {
            üye.roles.add(komut.verilecekRol)
            message.react(green)
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${green} Başarılı şekilde ${üye} kişisine ${komut.verilecekRol.map(x => `<@&${x}>`)} rolünü verdim.`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
            channel.wsend({ embeds: [new EmbedBuilder().setDescription(`${message.member} yetkilisi tarafından ${üye} kişisine ${komut.verilecekRol.map(x => `<@&${x}>`)} rolü verildi.`)] })
        } else {
            üye.roles.remove(komut.verilecekRol)
            message.react(green)
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${green} Başarılı şekilde ${üye} kişisinden ${komut.verilecekRol.map(x => `<@&${x}>`)} rolünü aldım.`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
            channel.wsend({ embeds: [new EmbedBuilder().setDescription(`${message.member} yetkilisi tarafından ${üye} kişisinden ${komut.verilecekRol.map(x => `<@&${x}>`)} rolü alındı.`)] })
            }
    }
}; 
module.exports.conf = {
    name: "messageCreate"
};