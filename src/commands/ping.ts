import { Client, CommandInteraction } from "discord.js";

export const desc: string = "Send a pong message when received ping";

export const init = (interaction: CommandInteraction, client: Client) => {
  interaction.reply("pong");
};
