import {Component, Input, OnInit} from '@angular/core';
import {QuizColor} from "../../../models/quiz-color.model";

@Component({
  selector: 'app-quiz-color',
  templateUrl: './quiz-color.component.html',
  styleUrls: ['./quiz-color.component.scss']
})
export class QuizColorComponent implements OnInit {

  @Input()
  quizColor: QuizColor;

  constructor() {
  }

  ngOnInit(): void {

  }

  setColor() {
    let div = document.getElementById("square") as HTMLDivElement;
    div.style.backgroundColor = this.quizColor.color;
  }

}
