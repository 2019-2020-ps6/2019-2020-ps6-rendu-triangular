import {Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;



  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  public quizUrl = 'http://localhost:9428/api/quizzes';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

    addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://localhost:9428/api/quizzes');
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < quiz.questions.length; i++) {
      this.deleteQuestion(quiz, quiz.questions[i]);
    }
  }

  editQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.put<Quiz>(urlWithId, this.httpOptions).subscribe( () => this.setQuizzesFromUrl());
    }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    this.updateQuizzes(quiz, this.quizzes.indexOf(quiz));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    this.updateQuizzes(quiz, this.quizzes.indexOf(quiz));
  }


  /** Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.

  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }
   **/
  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }

}
