import axios from "axios";
import { Question } from "../types/type";

export const fetchQuestionByDifficulty = async (difficulty: string) => {
  try {
    const response = await axios.get(
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
  } catch (err) {
    console.log(err);
  }
};
