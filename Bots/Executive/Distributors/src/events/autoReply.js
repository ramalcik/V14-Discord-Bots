const conf = require("../../../src/configs/sunucuayar.json")
const { welcome4 } = require("../../../src/configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "sa" || message.content.toLowerCase() === "SA" || message.content.toLowerCase() === "Sa") {
    message.react(welcome4);
    message.reply({ content: `**Aleyküm Selam Hoş Geldin!!**`});
  }
};
module.exports.conf = {
  name: "messageCreate"
};