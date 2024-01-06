import { AnswerModel } from "./answer";

export interface QuestionModel {
  id: number;
  type: "LISTENING" | "READING";
  question: string;
  resource: string;
  answers: AnswerModel[];
}

interface AnswerProps {
  content: string;
  isResult: boolean;
}

export interface QuestionRequest {
  testId: string | number;
  type: "LISTENING" | "READING";
  question: string;
  answers: AnswerProps[];
}
