import {Quiz} from "./quiz.model";
import {QuizColor} from "./quiz-color.model";

export class Patient {
  _id: string
  firstName: string;
  lastName: string;
  age: number;
  quizzesImage: Quiz[];
  quizzesColor: QuizColor[];

  constructor() {

  }
}
