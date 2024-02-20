import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Message,
  Partials,
  REST,
  Routes,
} from "discord.js";
import { CommandTmp } from "./types/type";
import { AllCommands } from "./commands/commands";
import { options } from "./types/constants";
import { startQuiz } from "./quizHelpers/startQuiz";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});

let commands: CommandTmp[] = [];

client.once("ready", () => {
  console.log("Bot Ready!");
  // console.log(client.user?.tag);
  // console.log(client.users);

  AllCommands.forEach((command) => {
    commands = [
      ...commands,
      {
        name: command.name,
        description: command.description,
        init: command.init,
        options: command.options,
      },
    ];
  });

  // console.log(commands);
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
