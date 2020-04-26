import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {QuizColor} from "../models/quiz-color.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class QuizColorService {

  quizColorList: QuizColor[];

  quiColorsList$: BehaviorSubject<QuizColor[]> = new BehaviorSubject<QuizColor[]>(this.quizColorList);

  quizColorListUrl: string = "http://localhost:9428/api/quiz-colo";

  constructor(private http: HttpClient) {
    this.getAllQuizColor();
  }

  getAllQuizColor() {
    this.http.get<QuizColor[]>(this.quizColorListUrl).subscribe((list) => {
      this.quizColorList = list;
      this.updateQuizColorList();
    })
  }

  getQuizColorArray() {
    return this.quizColorList;
  }

  addQuiztoList(quiz: QuizColor) {
    this.http.post<QuizColor[]>(this.quizColorListUrl, quiz).subscribe(() => {
      this.getAllQuizColor();
    })
  }

  deleteOnequiz(quiz: QuizColor) {
    this.http.delete(this.quizColorListUrl + "/" + quiz.id).subscribe(() => {
      this.getAllQuizColor();
    })
  }

  updateQuizColorList() {
    this.quiColorsList$.next(this.quizColorList);
  }

}
