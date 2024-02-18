import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import {
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} from "@discordjs/builders";
import { Question } from "../types/type";
import { fetchQuestionByDifficulty } from "../utils/questionFetcher";

export function getDifficultySelectMenu() {
  const select = new StringSelectMenuBuilder()
    .setCustomId("difficulty-select")
    .setPlaceholder("Please select the difficulty level")
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel("Easy").setValue("easy"),
      new StringSelectMenuOptionBuilder().setLabel("Medium").setValue("medium"),
      new StringSelectMenuOptionBuilder().setLabel("Hard").setValue("hard")
    );

  return select;
}

export function getQuestionSelectMenu(question: Question | undefined) {
  const select = new StringSelectMenuBuilder()
    .setCustomId("question-select")
    .setPlaceholder(question?.options[0] || "")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(question?.options[0] || "")
        .setValue(question?.options[0] || ""),
      new StringSelectMenuOptionBuilder()
        .setLabel(question?.options[1] || "")
        .setValue(question?.options[1] || ""),
      new StringSelectMenuOptionBuilder()
        .setLabel(question?.options[2] || "")
        .setValue(question?.options[2] || ""),
      new StringSelectMenuOptionBuilder()
        .setLabel(question?.options[3] || "")
        .setValue(question?.options[3] || "")
    );
  return select;
}
