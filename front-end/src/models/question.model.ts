export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export class Question {
  id: string;
  label: string;
  image?: string;
  answers: Answer[];
}
