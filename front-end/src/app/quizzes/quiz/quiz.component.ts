import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
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

  defautlurlImage = "https://medias.liberation.fr/photo/1269696-p-tit-libe-les-droits-de-l-enfant-menu-quiz.png?modified_at=1573658071&ratio_x=03&ratio_y=02&width=750"

  constructor(private quizService: QuizService, private elementRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.getElementById('quiz-card').style.background = this.quiz.image;
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

  modify() {
    this.modifyQuiz.emit(this.quiz);
  }

  getImageUrl() {

    if (this.quiz.image !== undefined)
      return "url(' " + this.quiz.image + " ')";

    return "url(' " + this.defautlurlImage + " ')";
  }
}
