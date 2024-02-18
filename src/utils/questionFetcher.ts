import axios from "axios";
import { Question } from "../types/type";
import { prepareOptionArray } from "./utils";

export const fetchQuestionByDifficulty = async (difficulty: string) => {
  try {
    let response = await axios.get(
      `${process.env.TRIVIA_URL}?amount=1&difficulty=${difficulty}&type=multiple`
    );
    const optionArray = prepareOptionArray(
      response.data.results[0].incorrect_answers,
      response.data.results[0].correct_answer
    );
    const question: Question = {
      question: response.data.results[0].question,
      options: optionArray,
      answer: response.data.results[0].correct_answer,
    };
    return question;
  } catch (err) {
    console.log("Error fetchQuestionByDifficulty");
    console.log(err);
  }
};
