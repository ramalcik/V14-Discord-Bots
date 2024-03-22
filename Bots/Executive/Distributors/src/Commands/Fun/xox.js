const Discord = require("discord.js");
const emojis = require("../../../../src/configs/emojis.json");
const settings = require("../../../../../../config.json");
module.exports = {
conf: {
aliases: ["xox"],
name: "xox",
help: "xox @Kullanıcı/ID",
category: "User"      
},
run: async (client, message, args, embed, prefix) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!member) {
return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" })
}
let kanallar = ["xox", "xox-chat","sikayet"]
if (!kanallar.some((x) => message.channel.name.toLowerCase().includes(x))) return message.reply({content: `xox kanallarında kullanabilirsiniz.`}).sil(15)
if(member.id === message.author.id) return message.reply({content: `Kendin ile xox oynayamazsın.`})
new TicTacToe({
message: message,
opponent: member,
xrenk: "Danger",
orenk: "Success",
xEmoji: "❌",
oEmoji: "⭕",
}).start();
return;
}
} 
class TicTacToe {
constructor(options) {
if (options.xEmoji) this.xEmoji = options.xEmoji;
else this.xEmoji = "❌";
if (options.oEmoji) this.oEmoji = options.oEmoji;
else this.oEmoji = "⭕";
if (options.xrenk) this.xrenk = options.xrenk;
else this.xrenk = "Blurple";
if (options.orenk) this.orenk = options.orenk;
else this.orenk = "Blurple";
if (!options.opponent) throw new TypeError("Kullanıcıyı düzgünce belirt.");
if (!options.message) throw new TypeError("Kullanıcıyı düzgünce belirt.");
this.message = options.message;
this.opponent = options.opponent;
}
async start() {
let [a1, a2, a3, b1, b2, b3, c1, c2, c3] = getBoarder();
let [a11, a22, a33, b11, b22, b33, c11, c22, c33] = getIds();
let [A1, A2, A3, B1, B2, B3, C1, C2, C3] = getButtons();
const author = this.message.author.id;
const member = this.opponent;
const authorName = this.message.author.username;
const gameData = [
{
member: this.message.author,
em: this.xEmoji,
color: this.xrenk,
},
{
member: member,
em: this.oEmoji,
color: this.orenk,
},
];
let player = Math.floor(Math.random() * gameData.length);
const midDuel = new Set();
if (midDuel.has(author)) {
return this.message.reply(`Aktif olarak oynadıgın bir oyun var zaten.`).sil(15);
} else if (midDuel.has(member.id)) {
return this.message.reply(`<@${member.id}> şu anda bir düelloda`).sil(15);
}
if (member.id === this.message.client.user.id) {
return;
}
let Embed;
if (player == 0) {
Embed = new Discord.EmbedBuilder()
.setTitle(`${this.message.member.displayName} *vs* ${this.opponent.user.displayName}`)
.setDescription(`**${this.message.member}** Sıra sende.`)
.setColor('Random');
} else {
Embed = new Discord.EmbedBuilder()
.setTitle(`${this.opponent.user.displayName} *Vs* ${this.message.member.displayName.displayName}`)
.setDescription(`**${this.opponent.user}** Sıra sende.`)
.setColor('Random');
}
this.message.reply({embeds: [Embed], components: [new Discord.ActionRowBuilder().addComponents([A1, A2, A3]), new Discord.ActionRowBuilder().addComponents([B1, B2, B3]), new Discord.ActionRowBuilder().addComponents([C1, C2, C3]),],}).then(async (msg) => {
midDuel.add(author);
midDuel.add(member.id);
const gameCollector = msg.createMessageComponentCollector({filter: (i) => i?.isButton() && i?.user && (i?.user.id == this.message.author.id || i?.user.id == this.opponent.id) && i?.message.author.id == this.message.client.user.id,});
gameCollector.on("collect", async (btn) => {
if (btn.customId == a11 && gameData[player].member.id === btn.user.id) {
await btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
a1 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {
console.log(e.stack ? e.stack : e);
}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
A1 = new Discord.ButtonBuilder()
.setCustomId(a11)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == a22 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
a2 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
    Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
A2 = new Discord.ButtonBuilder()
.setCustomId(a22)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == a33 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
a3 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
    Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
A3 = new Discord.ButtonBuilder()
.setCustomId(a33)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == b11 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
b1 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
B1 = new Discord.ButtonBuilder()
.setCustomId(b11)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == b22 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
b2 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
B2 = new Discord.ButtonBuilder()
.setCustomId(b22)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == b33 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
b3 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
B3 = new Discord.ButtonBuilder()
.setCustomId(b33)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == c11 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
c1 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
C1 = new Discord.ButtonBuilder()
.setCustomId(c11 ? c11 : "c11")
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if (btn.customId == c22 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
c2 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji &&  b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (
a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {
console.log(e.stack ? e.stack : e);
}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
C2 = new Discord.ButtonBuilder()
.setCustomId(c22)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else if ( btn.customId == c33 && gameData[player].member.id === btn.user.id) {
btn.deferUpdate();
if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
btn.message.update({content: "O buttona zaten tıklamışlar."});
} else {
try {
c3 = gameData[player].em;
if ((a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji) || (a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) || (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji) || (a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) || (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji) || (a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji) || (a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) || (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji) || (b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) || (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji) || (c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) || (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji) || (a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) || (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji) || (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)) {
this.message.reply({content: `Tebrikler! ${gameData[player].member} Sen kazandın.`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
} else if (
a1 !== "⬜" && a2 !== "⬜" && a3 !== "⬜" && b1 !== "⬜" && b2 !== "⬜" && b3 !== "⬜" && c1 !== "⬜" && c2 !== "⬜" && c3 !== "⬜") {
this.message.reply({content: `Oyun berabere bitti`});
gameCollector.stop();
midDuel.delete(author);
midDuel.delete(member.id);
}
} catch (e) {}
player = (player + 1) % 2;
if (player == 0) {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
} else {
Embed = new Discord.EmbedBuilder().setDescription(`${this.message.member} *Vs* ${this.opponent.user}`).setColor('Random');
}
C3 = new Discord.ButtonBuilder()
.setCustomId(c33)
.setStyle(`${gameData[player].color}`)
.setEmoji(gameData[player].em)
.setDisabled();
}
} else {
return btn.reply({content: "Lütfen rakibinizi bekleyin.", ephemeral: true});
}
msg.edit({embeds: [Embed],components: [new Discord.ActionRowBuilder().addComponents([A1, A2, A3]), new Discord.ActionRowBuilder().addComponents([B1, B2, B3]), new Discord.ActionRowBuilder().addComponents([C1, C2, C3]),]});
});
gameCollector.on("end", async (btn) => {
msg.edit({embeds: [Embed], components: [new Discord.ActionRowBuilder().addComponents([A1.setDisabled(), A2.setDisabled(), A3.setDisabled()]), new Discord.ActionRowBuilder().addComponents([B1.setDisabled(), B2.setDisabled(), B3.setDisabled()]), new Discord.ActionRowBuilder().addComponents([C1.setDisabled(), C2.setDisabled(), C3.setDisabled()])]}).catch(() => {});
});
});
function getBoarder() {
return ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"];
}
function getIds() {
return ["A1-1", "A2-2", "A3-3", "B1-1", "B2-2", "B3-3", "C1-1", "C2-2", "C3-3",];
}
function getButtons() {
return [
new Discord.ButtonBuilder()
.setCustomId(a11)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("1"),
new Discord.ButtonBuilder()
.setCustomId(a22)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("2"),
new Discord.ButtonBuilder()
.setCustomId(a33)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("3"),
new Discord.ButtonBuilder()
.setCustomId(b11)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("4"),
new Discord.ButtonBuilder()
.setCustomId(b22)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("5"),
new Discord.ButtonBuilder()
.setCustomId(b33)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("6"),
new Discord.ButtonBuilder()
.setCustomId(c11)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("7"),
new Discord.ButtonBuilder()
.setCustomId(c22)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("8"),
new Discord.ButtonBuilder()
.setCustomId(c33)
.setStyle(Discord.ButtonStyle.Secondary)
.setLabel("9"),
];
}
}
}