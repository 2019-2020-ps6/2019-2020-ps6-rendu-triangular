import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-view-list-quiz',
  templateUrl: './view-list-quiz.component.html',
  styleUrls: ['./view-list-quiz.component.scss']
})
export class ViewListQuizComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
}
