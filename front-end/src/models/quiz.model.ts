import {Question} from './question.model';

export class Quiz {
  id: string;
  name: string;
  theme?: string;
  questions: Question[];
  image?: string;
  questionIndex: number;
}
