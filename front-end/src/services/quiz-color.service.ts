import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {QuizColor} from "../models/quiz-color.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class QuizColorService {

  quizColorList: QuizColor[];

  private quizColor2DArray: QuizColor[][] = [];

  public selectedQuizColor: QuizColor[];

  public selectedQuiColor$: BehaviorSubject<QuizColor[]> = new BehaviorSubject<QuizColor[]>(this.selectedQuizColor)

  public quiColorsList$: BehaviorSubject<QuizColor[]> = new BehaviorSubject<QuizColor[]>(this.quizColorList);

  public quizColor2D$: BehaviorSubject<QuizColor[][]> = new BehaviorSubject<QuizColor[][]>(this.quizColor2DArray);

  public singleQuiz$: Subject<QuizColor> = new Subject<QuizColor>();

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
    this.http.delete(this.quizColorListUrl + "/" + quiz._id).subscribe(() => {
      this.getAllQuizColor();
      this.update2DArray();
    })
  }

  setSelectedQuizID(id: string) {
    this.http.get<QuizColor>(this.quizColorListUrl + '/' + id).subscribe((singleQuiz) => {
      this.singleQuiz$.next(singleQuiz);
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
      if (i === this.quizColorList.length)
        quiz2D[index2D].push(this.quizColorList[i - 1]);
      if (index2D === quiz2D[quiz2D.length - 1].length)
        quiz2D[index2D].push(this.quizColorList[i - 1]);

    }

    this.quizColor2DArray = quiz2D
    this.quizColor2D$.next(this.quizColor2DArray);

    return quiz2D;
  }

  getQuizColor2DArray() {
    this.quizColor2D$.next(this.quizColor2DArray);
    return this.quizColor2DArray;
  }

  setSelectedQuizColor(qui) {
    this.selectedQuizColor = qui;
    this.selectedQuiColor$.next(this.selectedQuizColor);
  }

  getSelectedQuizColor() {
    this.selectedQuiColor$.next(this.selectedQuizColor);
    return this.selectedQuizColor;
  }

  update2DArray() {
    this.quizColor2DArray = this.returnMapping2DArray();
    this.quizColor2D$.next(this.quizColor2DArray);
  }
}
