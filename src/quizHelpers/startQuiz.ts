import {
  ActionRowBuilder,
  AnyComponentBuilder,
  Client,
  CommandInteraction,
} from "discord.js";
import { getDifficultySelectMenu } from "./menus";
import { fetchQuestionByDifficulty } from "../utils/questionFetcher";
import { sendQuestion } from "./questionSender";

export async function startQuiz(interaction: CommandInteraction) {
  //   await interaction.reply(
  //     "Welcome to the quiz! Please select the difficulty level."
  //   );
  //APIActionRowComponent<APIMessageActionRowComponent>
  const difficultyRow = new ActionRowBuilder().addComponents(
    getDifficultySelectMenu()
  );
  await interaction.channel?.send({
    content: "Selecte difficulty level: ",
    //@ts-ignore
    components: [difficultyRow],
  });

  const filter = (i: any) => i.user.id === interaction.user.id;

  const collector = interaction.channel?.createMessageComponentCollector({
    filter,
    time: 30_000,
  });

  collector?.on("collect", async (i) => {
    if (i.isAnySelectMenu()) {
      await i.deferUpdate();
      const difficulty = i.values[0];
      await sendQuestion(interaction, difficulty);
    }
  });

  collector?.on("end", async () => {
    await interaction.followUp(
      "Time is up. Select the difficulty level again. To stop select stop from the given options"
    );
  });
}
