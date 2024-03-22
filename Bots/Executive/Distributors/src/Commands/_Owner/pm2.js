const { codeBlock } = require("@discordjs/formatters");
const children = require("child_process");

module.exports = {
  conf: {
    aliases: ['pm2'],
    name: "pm2",
    help: "pm2",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    const ls = children.exec(`pm2 ${args.join(' ')}`);
    ls.stdout.on('data', function (data) {
      message.channel.send(codeBlock("js", data));
    });
  },
};