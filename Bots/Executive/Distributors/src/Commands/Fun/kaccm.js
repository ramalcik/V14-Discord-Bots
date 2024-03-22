module.exports = {
    conf: {
      aliases: ["kaccm","cm"],
      name: "kaccm",
      help: "kaccm [Text]",
     category: "User"     
    },
  
run: async (client, message, args, embed, prefix) => {

    let yarraklar = [
        "senin yarran 22 cm :eggplant:",
        "senin yarran 1 cm :eggplant:",
        "senin yarran 4 cm :eggplant:",
        "senin yarran 23 cm :eggplant:",
        "senin yarran 8 cm :eggplant:",
        "senin yarran 28 cm :eggplant:",
        "senin yarran 5 cm :eggplant:",
        "senin yarran 78 kime girdiyse geberdi :eggplant:"
      ];
    const member = await message.mentions.members.first() ||await message.guild.members.cache.get(args[0]) || await message.member
    if(member){
    message.channel.send({content:`${member}, ${yarraklar[Math.floor(Math.random() * yarraklar.length)]}`})
    }
}
}    