export interface Answer {
  type?: string;
  value: string;
  isCorrect: boolean;
}

export class Question {
  _id: string;
  label: string;
  image?: string;
  quizId: string;
  answers: Answer[];
}
