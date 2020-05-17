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

  userAnswers: LancementComponent;
  public quizSelected$: Subject<Quiz> = new Subject();
  public quizUrl = 'http://localhost:9428/api/quizzes';
  public quizIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public question$: Subject<Question> = new Subject();
  public voirLaReponseState: Subject<boolean> = new Subject<boolean>();
  public rejouerLaPartieState: Subject<boolean> = new Subject<boolean>();
  public finalScore$: Subject<Number> = new Subject<Number>();
  public questionsOfQuiz$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(null);
  private quizzes: Quiz[] = QUIZ_LIST;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  private questionsPath = 'questions';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  getAnswerArray() {
    return this.userAnswers.getUserArrayOfAnswercopy();
  }

  public quizSelectedUpdater(quiz: Quiz) {
    this.quizSelected$.next(quiz);
  }

  public performQuizIndex(index) {
    this.quizIndex$.next(index);
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList //this.parseObjectToQuiz(quizList);
      this.quizzes$.next(this.quizzes);
    });

  }

  getQuizById(quiz: Quiz) {
    const url = this.quizUrl + '/' + quiz._id;
    return this.http.get<Quiz>(url);
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    this.updateQuizzes(quiz._id);
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://localhost:9428/api/quizzes/');
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.http.get<Question[]>(questionUrl).subscribe((liste) => {
        quiz.questions = liste;
      })
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz._id;
    for (let i = 0; i < quiz.questions.length; i++) {
      this.deleteQuestion(quiz, quiz.questions[i]);
    }

    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());


  }

  editQuiz(oldQuiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + oldQuiz._id;
    this.http.put<Quiz>(urlWithId, oldQuiz).subscribe(() => this.setQuizzesFromUrl());
  }

  getQuestion(quizId: string) {
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath;
    this.http.get<Question[]>(questionUrl).subscribe((d) => {
      this.questionsOfQuiz$.next(d);
    });
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz._id + '/' + this.questionsPath;
    if (question.quizId === quiz._id)
      this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz._id));

    /*if(!this.checkifQuestionAlreadyExist(question, quiz)){
      quiz.questions.push(question);
      this.editQuiz(quiz);
    }*/
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz._id + '/' + this.questionsPath + '/' + question._id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz._id));


    const url = this.quizUrl + '/' + quiz._id + '/' + this.questionsPath;
    this.http.get<Question[]>(url).subscribe((questions) => {
      quiz.questions = questions;
    })
    this.quizSelected$.next(quiz);
  }

  performQuestion(question) {
    this.question$.next(question);
  }

  public getQuizList(): Quiz[] {
    return this.quizzes;
  }

  public updateQuizzes(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe(() => this.setQuizzesFromUrl());
  }

  public perfomQuiz(quiz) {
    this.quizSelected$.next(quiz);
    this.setQuizzesFromUrl();
  }

  parseObjectToQuiz(obj: Object) {
    let tempQuiz = obj as Quiz[];
    let newQuiz: Quiz[] = []

    for (let quiz of tempQuiz) {
      const formedQuiz = new Quiz();
      formedQuiz._id = quiz._id;
      formedQuiz.image = quiz.image;
      formedQuiz.questionIndex = quiz.questionIndex;
      formedQuiz.questions = quiz.questions;

      //assign question to quiz
      const urlPath = this.quizUrl + '/' + formedQuiz._id + '/' + this.questionsPath;
      let tempArr: Question[] = [];
      this.http.get<Question[]>(urlPath).subscribe((liste) => {
        tempArr = liste;

        if (tempArr != undefined) {
          for (let question of tempArr) {
            if (question.quizId === formedQuiz._id)
              formedQuiz.questions.push(question);
          }
        } else
          formedQuiz.questions = quiz.questions;

      })

      formedQuiz.theme = quiz.theme;
      formedQuiz.name = quiz.name;
      newQuiz.push(formedQuiz);
    }
    return newQuiz;
  }

  private checkifQuestionAlreadyExist(question: Question, quiz: Quiz) {
    for (let q of quiz.questions) {
      if (question._id === q._id && question.quizId === quiz._id)
        return true;
    }
    return false;
  }

}
