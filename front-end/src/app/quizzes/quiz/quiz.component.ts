import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Subscription} from "rxjs";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  modifyQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  subscription: Subscription = new Subscription();
  subscriptionIndex: Subscription = new Subscription();

  constructor(private quizService: QuizService) {
    this.subscription = this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    })

    this.subscriptionIndex = this.quizService.quizIndex$.subscribe((index) => {
      this.quiz.questionIndex = index;
    })
  }

  ngOnInit() {

  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }

  edit() {
    this.editQuiz.emit(this.quiz);
  }

  delete() {
    this.deleteQuiz.emit(this.quiz);
  }

  modify(){
    this.modifyQuiz.emit(this.quiz);
  }
}
