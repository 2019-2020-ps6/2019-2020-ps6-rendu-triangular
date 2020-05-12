import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
  _id: '1',
  quizId: '1',
  label: 'Jean Gabin a joué dans...',
  answers: [
    {
      value: 'Les tuches II',
      isCorrect: false,
    },
    {
      value: 'La grande illusion',
      isCorrect: true,
    }
    ]
};

export const QUESTION_SPORT: Question = {
  _id: '1',
  label: 'Qui est Usain Bolt ?',
  quizId: '1',
  answers: [
    {
      value: 'Un footballer',
      isCorrect: true,
    },
    {
      value: 'Un Marathonien',
      isCorrect: true,
    }
  ]
};

export const QUIZ_LIST: Quiz[] = [
  {
    _id: '1',
    name: 'Les Cinéastes', // What's happening if I change this value..?
    theme: 'Actor',
    questions: [QUESTION_ACTOR],
    questionIndex: 0,
  },
  ];
