import { Client, CommandInteraction } from "discord.js";
import { Command } from "../types/type";

export const AllCommands: Command[] = [
  {
    name: "ping",
    description: "Replies with pong when received ping",
    init: (interaction: CommandInteraction, client: Client) => {
      interaction.reply("pong");
    },
  },
  {
    name: "start-quiz",
    description: "Starts a quiz",
    init: (interaction: CommandInteraction, client: Client) => {
      interaction.reply("pong");
    },
  },
];
