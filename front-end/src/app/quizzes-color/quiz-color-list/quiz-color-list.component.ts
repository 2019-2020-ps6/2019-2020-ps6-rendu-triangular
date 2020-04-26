import {Component, OnInit} from '@angular/core';
import {QuizColor} from "../../../models/quiz-color.model";
import {QuizColorService} from "../../../services/quiz-color.service";

@Component({
  selector: 'app-quiz-color-list',
  templateUrl: './quiz-color-list.component.html',
  styleUrls: ['./quiz-color-list.component.scss']
})
export class QuizColorListComponent implements OnInit {

  quizList: QuizColor[];

  constructor(private quizColorService: QuizColorService) {
    this.quizColorService.quiColorsList$.subscribe((list) => {
      this.quizList = list;
    })
    console.log("contructor quizcolorList :" + this.quizList);
  }

  ngOnInit(): void {
  }

}
