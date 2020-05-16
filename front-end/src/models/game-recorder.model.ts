import {User} from "./user.model";

export class GameRecorder {
  _id: number;
  startDate: Date;
  endDate: Date;
  numberOfAttempts: number;
  finalScore: number
  duration: number;
  typeOfQuiz: string;
  patient: User;
}
