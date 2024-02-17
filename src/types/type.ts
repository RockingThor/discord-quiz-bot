import { Client, CommandInteraction } from "discord.js";

export interface CommandTmp {
  name: string;
  description: string;
  init: (interaction: CommandInteraction, client: Client) => void;
  options?: any[];
}
