import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuizService} from "../../../services/quiz.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  sub: Subscription = new Subscription()

  constructor(private quizService: QuizService) {

  }

  ngOnInit() {
    this.sub = this.quizService.question$.subscribe((question) => {

    })
    this.quizService.performQuestion(this.question);

  }

  delete() {
    this.deleteQuestion.emit(this.question);
  }

  getImageUrl() {
    return 'url("' + this.question.image + '")';
  }

}
