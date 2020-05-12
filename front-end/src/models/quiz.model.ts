import {Question} from './question.model';

export class Quiz {
  _id: string;
  name: string;
  theme?: string;
  questions: Question[];
  image?: string;
  questionIndex: number;
}
