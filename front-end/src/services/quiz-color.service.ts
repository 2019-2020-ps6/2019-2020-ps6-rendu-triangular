import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {QuizColor} from "../models/quiz-color.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class QuizColorService {

  quizColorList: QuizColor[];

  private quizColor2DArray: QuizColor[][] = [];

  quiColorsList$: BehaviorSubject<QuizColor[]> = new BehaviorSubject<QuizColor[]>(this.quizColorList);

  quizColor2D$: BehaviorSubject<QuizColor[][]> = new BehaviorSubject<QuizColor[][]>(this.quizColor2DArray);

  quizColorListUrl: string = "http://localhost:9428/api/quiz-color";

  constructor(private http: HttpClient) {
    this.getAllQuizColor();
  }

  getAllQuizColor() {
    this.http.get<QuizColor[]>(this.quizColorListUrl).subscribe((list) => {
      this.quizColorList = list;
      this.updateQuizColorList();
      this.update2DArray();
    })
  }

  getQuizColorArray() {
    return this.quizColorList;
  }

  addQuiztoList(quiz: QuizColor) {
    this.http.post<QuizColor[]>(this.quizColorListUrl, quiz).subscribe(() => {
      this.getAllQuizColor();
      this.update2DArray();
    })
  }

  deleteOnequiz(quiz: QuizColor) {
    this.http.delete(this.quizColorListUrl + "/" + quiz.id).subscribe(() => {
      this.getAllQuizColor();
      this.update2DArray();
    })
  }

  updateQuizColorList() {
    this.quiColorsList$.next(this.quizColorList);
  }

  returnMapping2DArray() {
    let index2D = 0;
    let quiz2D: QuizColor[][] = [];
    quiz2D[index2D] = [];
    quiz2D[index2D].push(this.quizColorList[0]);

    for (let i = 1; i < this.quizColorList.length; i++) {
      if (this.quizColorList[i - 1].name === this.quizColorList[i].name) {
        quiz2D[index2D].push(this.quizColorList[i - 1]);
      } else if (this.quizColorList[i - 1].name != this.quizColorList[i].name) {
        index2D++;
        quiz2D[index2D] = [];
      }
    }

    return quiz2D;
  }

  getQuizColor2DArray() {
    console.log("retrieving 2d array" + this.quizColor2DArray)
    this.quizColor2D$.next(this.quizColor2DArray);
    return this.quizColor2DArray;
  }

  setQuizColor2DArray(quiz2D) {
    this.quizColor2DArray = quiz2D;
    this.quizColor2D$.next(quiz2D);
  }

  update2DArray() {
    this.quizColor2DArray = this.returnMapping2DArray();
    this.quizColor2D$.next(this.quizColor2DArray);
  }
}
