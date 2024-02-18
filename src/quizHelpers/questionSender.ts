import { ActionRowBuilder, CommandInteraction, REST } from "discord.js";
import { Question } from "../types/type";
import { fetchQuestionByDifficulty } from "../utils/questionFetcher";
import { getQuestionSelectMenu } from "./menus";

export async function sendQuestion(
  interaction: CommandInteraction,
  difficulty: string
) {
  await interaction.followUp(
    "Fasten your seatbelts! Quiz questions on your way..."
  );

  const question: Question | undefined = await fetchQuestionByDifficulty(
    difficulty
  );

  const questionRow = new ActionRowBuilder().addComponents(
    //@ts-ignore
    getQuestionSelectMenu(question)
  );

  await interaction.channel?.send({
    content: `${question?.question}`,
    //@ts-ignore
    components: [questionRow],
  });

  console.log("Was here 3");
  const filter = (i: any) =>
    i.customId === question?.answer && i.user.id === interaction.user.id;

  try {
    const collected = await interaction.channel?.awaitMessageComponent({
      filter,
      time: 15000,
    });
    if (collected) {
      await interaction.followUp(`Correct answer is: ${question?.answer}`);
    }
  } catch (err) {
    console.log("Error: sendQuestion()");
    console.log(err);
  }
}
