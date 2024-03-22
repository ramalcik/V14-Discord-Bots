const conf = require("../../../src/configs/sunucuayar.json")
const { welcome4 } = require("../../../src/configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === ".papaz" || message.content.toLowerCase() === ".papazcim" || message.content.toLowerCase() === ".ansident") {
    message.react(welcome4);
    message.reply({ content: `**papaz Bu Kardeş Şakaya Gelmez :)**`});
  }
};
module.exports.conf = {
  name: "messageCreate"
};