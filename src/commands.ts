import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "initial",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN || "");

try {
  console.log("Started refreshing application (/) commands.");

  console.log("Successfully reloaded application (/) commands.");
} catch (err) {
  console.error(err);
}
