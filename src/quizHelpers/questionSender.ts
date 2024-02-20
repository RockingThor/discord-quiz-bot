import {
  ActionRowBuilder,
  Collector,
  CommandInteraction,
  InteractionResponse,
  REST,
} from "discord.js";
import { Question, Score } from "../types/type";
import { fetchQuestionByDifficulty } from "../utils/questionFetcher";
import { getQuestionSelectMenu } from "./menus";

export async function sendQuestion(
  interaction: CommandInteraction,
  difficulty: string
) {
  let scores: Score[] = [];
  await interaction.channel?.send(
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

  let message = await interaction.fetchReply();
  console.log("From message", message);

  try {
    // const collected = await interaction.channel?.awaitMessageComponent({
    //   filter,
    //   time: 15_000,
    // });
    // if (collected) {
    //   await interaction.followUp(`Correct answer is: ${question?.answer}`);
    // }
    const filter = (i: any) =>
      i.isMessageComponent() && i.user.id !== interaction.client.user.id;
    const collecter = interaction.channel?.createMessageComponentCollector({
      filter,
      time: 15_000,
    });

    collecter?.on("collect", async (i) => {
      if (i.isAnySelectMenu()) {
        await i.deferUpdate();
        //console.log(i.values);
        const selectedValue = i.values[0];
      }
    });
    collecter?.on("end", async (i) => {
      // console.log(i.values);
      await interaction.channel?.send("Correct answer is: " + question?.answer);
    });
  } catch (err) {
    console.log("Error: sendQuestion()");
    console.log(err);
  }
}
