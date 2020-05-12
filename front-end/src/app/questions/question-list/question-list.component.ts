import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from 'src/models/question.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(private quizService: QuizService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    //this.quizService.setSelectedQuiz(this.router.snapshot.paramMap.get('id'))
    console.log(this.quiz.questions[0].image);
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

}
