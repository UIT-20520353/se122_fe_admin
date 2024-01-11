import { QuestionModel } from "./question";

export interface TestModel {
  id: number;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export interface TestDetailModel {
  id: number;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  questions: QuestionModel[];
  image: string | null;
  paragraph: string | null;
}

export interface TestRequest {
  name: string;
  level: string;
}

export interface TestDetail {
  id: number;
  title: string;
  difficultyLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  questions: Question[];
}

export interface Question {
  id: number;
  paragraph: string | null;
  audioUrl: string | null;
  type:
    | "MULTIPLE_LISTENING"
    | "SINGLE_LISTENING"
    | "PARAGRAPH_READING"
    | "SENTENCE_READING";
  questionDetails: QuestionDetail[];
}

export interface QuestionDetail {
  id: number;
  text: string;
  explain: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
  isCorrect: boolean;
}
