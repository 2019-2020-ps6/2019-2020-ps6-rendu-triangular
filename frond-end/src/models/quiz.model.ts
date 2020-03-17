import {Question} from './question.model';

export interface Quiz {
  name: string;
  theme: string;
  nbrQuestion: number;
  questions: Question[];
}
