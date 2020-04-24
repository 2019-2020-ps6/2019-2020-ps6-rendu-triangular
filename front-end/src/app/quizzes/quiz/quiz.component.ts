import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Subscription} from "rxjs";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit {

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

  constructor(private quizService: QuizService, private elementRef: ElementRef) {
    this.subscription = this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    })

    this.subscriptionIndex = this.quizService.quizIndex$.subscribe((index) => {
      this.quiz.questionIndex = index;
    })
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.getElementById('quiz-card').style.background = this.quiz.image;
  }

  ngOnInit() {
    this.resizeQuizImage();
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

  modify() {
    this.modifyQuiz.emit(this.quiz);
  }

  resizeQuizImage() {
    let card = document.getElementById('quiz-card') as HTMLDivElement;
    card.style.backgroundSize = "100px 100px";
  }

  getImageUrl() {
    return "url(' " + this.quiz.image + " ')";
  }

  getDefaultImageUrl() {
    return "url(' https://medias.liberation.fr/photo/1269696-p-tit-libe-les-droits-de-l-enfant-menu-quiz.png?modified_at=1573658071&ratio_x=03&ratio_y=02&width=750 ')";
  }
}
