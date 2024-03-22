const Bot = global.bot;

module.exports = async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = Bot.commands.get(interaction.commandName);
  if (!command) return;
  try {
    command.execute(interaction, Bot);
  } catch (err) {
    if (err) console.error("Error: ", err);
  }
};

module.exports.conf = {
  name: "interactionCreate",
};
