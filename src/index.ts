import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Message,
  Partials,
  REST,
  Routes,
} from "discord.js";
import fs from "fs";
import path from "path";
import { CommandTmp } from "./types/type";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});

let commandTmp: CommandTmp[] = [];
let commands: CommandTmp[] = [];

client.once("ready", () => {
  console.log("Bot Ready!");

  let commandFiles = fs.readdirSync(path.join(__dirname, "commands"));

  commandFiles.forEach((file, i) => {
    commandTmp[i] = require(`./commands/${file}`);
    commands = [
      ...commands,
      {
        name: file.split(".")[0],
        description: "Hello",
        init: commandTmp[i].init,
        options: commandTmp[i].options,
      },
    ];
  });

  console.log(commands);
  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN || "");
  rest
    .put(Routes.applicationCommands(client.application?.id || ""), {
      body: commands,
    })
    .then(() => {
      console.log("Successfully registered application commands.");
    })
    .catch(console.error);
});

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user?.tag}`);
// });

// client.on("message", (msg: Message) => {
//   if (msg.content === "ping") {
//     console.log(msg);
//     msg.reply("pong");
//   }
// });

// client.on("messageCreate", (msg: Message) => {
//   if (msg.content === "ping") {
//     console.log(msg);
//     msg.reply("pong");
//   }
// });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  const selectedCommand = commands.find((c) => {
    return c.name === commandName;
  });

  selectedCommand?.init(interaction, client);
});

client.login(process.env.TOKEN);
