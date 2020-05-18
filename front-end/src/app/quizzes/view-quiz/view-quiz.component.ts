import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  hideButton = false;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }

  getImageUrl() {
    return "url(' " + this.quiz.image + " ')";
  }

}
