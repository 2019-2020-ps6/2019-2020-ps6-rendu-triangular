import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
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

export const QUESTION_ACTOR1: Question = {
  label: 'Tom Cruise a joué dans ...',
  answers: [
    {
      value: 'Avengers Endgame',
      isCorrect: false,
    },
    {
      value: 'Mission Impossible : Rogue Nation',
      isCorrect: true,
    }
  ]
};

export const QUESTION_SPORT: Question = {
  label: 'Qui est Usain Bolt ?',
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

export const QUESTION_SPORT1: Question = {
  label: 'Qui a remporté le plus grand nombre de ballon dor ?',
  answers: [
    {
      value: 'Lionel Messi',
      isCorrect: true,
    },
    {
      value: 'Paul Pogba',
      isCorrect: false,
    },
    {
      value: 'Mohammed Salah',
      isCorrect: false,
    }
  ]
};

export const QUIZ_LIST: Quiz[] = [
  {
    name: 'Les Cinéastes', // What's happening if I change this value..?
    theme: 'Acteurs',
    nbrQuestion: 0,
    questions: []
  }
  /*{
      name: 'Les Sports',
      theme : 'Sports',
      questions: [],
  }*/
];
