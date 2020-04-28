import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuizColor} from "../../../models/quiz-color.model";

@Component({
  selector: 'app-quiz-color',
  templateUrl: './quiz-color.component.html',
  styleUrls: ['./quiz-color.component.scss']
})
export class QuizColorComponent implements OnInit {

  @Input()
  quizColor: QuizColor;

  @Input()
  displayValues: boolean = false

  @Output()
  deleteEmmitter: EventEmitter<QuizColor> = new EventEmitter<QuizColor>();

  constructor() {
  }

  ngOnInit(): void {

  }

  delete() {
    this.deleteEmmitter.emit(this.quizColor);
  }

}
