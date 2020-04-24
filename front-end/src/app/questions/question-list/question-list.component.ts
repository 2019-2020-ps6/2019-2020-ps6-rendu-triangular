import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from 'src/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    console.log(this.quiz.questions[0].image);
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

}
