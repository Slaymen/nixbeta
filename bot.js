// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Prefix $ | We are on ${client.guilds.size} servers | https://www.nixbot.tk`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Prefix $ | We are on ${client.guilds.size} servers | https://www.nixbot.tk`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Prefix $ | We are on ${client.guilds.size} servers | https://www.nixbot.tk`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  
    if(command === "uihvfhghierhiegihoeroweniwihq95j349y3t983x") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
    if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
      if(command === "ping") {
  if(message.content.indexof(<@134812399994667009>){
  message.delete()
  return message.channel.send("do not ping slayz")
  }
  
  if(command === "avatar") {
    message.channel.send(`${message.author.avatarURL}`);
  }

  if(command === "help") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle("Here Are The Commands")
    .setColor("00FFFF")
    .addField("$help", "Gives a list of commands.")
    .addField("$kick", "Removes a person from the server.")
    .addField("$ban", "Removes a person from the server forever.")
    .addField("$ping", "Shows latency between the bot and the API.")
    .addField("$dm", "Gives a small dm.")
    .addField("$avatar", "Shows a picture of your avatar.")
    .addField("$botinfo", "Displays information about the bot.")
    .addField("$serverinfo", "Displays information about the server.")
    .setFooter("Prefix: $ | This bot is still under construction", "http://2.bp.blogspot.com/-zyKlWanN5dI/Vj1Cd2jlWSI/AAAAAAAADL8/7IrG3rb9j1I/s1600/Anonymous-hacker-profile-picture.jpg");
    
    return message.channel.send(embed);
  }
  //message.author.avatarURL
    if(command === "dm") {
      message.member.send('Hello World!')
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.channel.send("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.channel.send("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
    if(command === "botinfo") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle("BOT INFO")
    .setColor("00FFFF")
    .addField("Bot Name:", "Nix")
    .addField("Bot Author", "SlayzNetwork#9316")
    .addField(`Servers`, `${client.guilds.size}`)
    .setFooter("If there are any issues contact the author.", "http://2.bp.blogspot.com/-zyKlWanN5dI/Vj1Cd2jlWSI/AAAAAAAADL8/7IrG3rb9j1I/s1600/Anonymous-hacker-profile-picture.jpg");
    
    return message.channel.send(embed);
  }
  
    if(command === "serverinfo") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle(`${message.guild}`)
    .setColor("00FFFF")
    .addField("OWNER:",message.guild.owner, true)
    .addField("ROLES:",message.guild.roles.size, true)
    .addField("REGION:",message.guild.region, true)
    .addField("MEMBERS:",message.guild.memberCount, true);
    
    return message.channel.send(embed);
  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.channel.send("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.channel.send("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
});

client.login(process.env.BOT_TOKEN);
