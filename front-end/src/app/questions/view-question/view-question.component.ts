import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {


  @Input()
  quiz: Quiz;

  @Input()
  question: Question;

  constructor() {
  }

  ngOnInit(): void {
  }

  getImageUrl() {
    return 'url("' + this.question.image + '")';
  }

}
