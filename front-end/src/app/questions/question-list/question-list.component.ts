import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from 'src/models/question.model';
import {ModalModule} from "angular-bootstrap-md";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(private quizService: QuizService, private modalService: ModalModule) {
  }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

  displayClickedQuestion(question: Question) {
  }


  open(content: TemplateRef<any>) {

  }
}
