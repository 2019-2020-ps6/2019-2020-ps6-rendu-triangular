import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuizColor} from "../../../models/quiz-color.model";

@Component({
  selector: 'app-quiz-color-view',
  templateUrl: './quiz-color-view.component.html',
  styleUrls: ['./quiz-color-view.component.scss']
})
export class QuizColorViewComponent implements OnInit {

  @Input()
  quizColor: QuizColor[];

  @Output()
  clickedEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  isclicked() {
    this.clickedEvent.emit(this.quizColor[0].id);
  }

}
