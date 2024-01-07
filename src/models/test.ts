import { QuestionModel } from "./question";

export interface TestModel {
  id: number;
  name: string;
  level: "EASY" | "MEDIUM";
}

export interface TestDetailModel {
  id: number;
  name: string;
  level: "EASY" | "MEDIUM";
  questions: QuestionModel[];
  image: string | null;
  paragraph: string | null;
}

export interface TestRequest {
  name: string;
  level: string;
}
