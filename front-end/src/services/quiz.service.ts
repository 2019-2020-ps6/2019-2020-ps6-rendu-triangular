import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {QUIZ_LIST} from '../mocks/quiz-list.mock';
import {Question} from '../models/question.model';
import {httpOptionsBase} from '../configs/server.config';
import {LancementComponent} from "../app/main/lancement/lancement.component";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = QUIZ_LIST;

  userAnswers: LancementComponent;

  getAnswerArray() {
    return this.userAnswers.getUserArrayOfAnswercopy();
  }

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

  getById(id) {
    for (let i of this.quizzes) {
      if (i.id === id)
        return i;
    }
    return null;
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    this.updateQuizzes(quiz.id);
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://localhost:9428/api/quizzes/');
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

  editQuiz(oldQuiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + oldQuiz.id;
    this.http.put<Quiz>(urlWithId, oldQuiz).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  public getQuizList(): Quiz[] {
    return this.quizzes;
  }

  public updateQuizzes(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe(() => this.setQuizzesFromUrl());
  }

  public modifyQuestionIndex(quiz: Quiz) {
    quiz.questionIndex++;
    this.perfomQuiz(quiz);
  }

  public perfomQuiz(quiz) {
    this.quizSelected$.next(quiz);
    this.setQuizzesFromUrl();

  }


}
