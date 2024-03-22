const Discord = require("discord.js");
const allah = require("../../../../../../config.json");

module.exports = {
  conf: {
    aliases: [],
    name: "eval",
    help: "eval <Code>",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    if (!args[0]) return;
    let code = args.join(" ");

    try {
      var result = clean(await eval(code));
      if (result.includes(client.token))
        return message.channel.send({ content: "Tokeni yarramın başını yersen alırsın orospu evladı"});
        message.channel.send({ content: `\`\`\`js\n${result}\n\`\`\``});
    } catch (e) {
			return message.channel.send({ content: `\`\`\`js\n${e}\n\`\`\`` });
		}
  },
};

function clean(text) {
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 0 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
}