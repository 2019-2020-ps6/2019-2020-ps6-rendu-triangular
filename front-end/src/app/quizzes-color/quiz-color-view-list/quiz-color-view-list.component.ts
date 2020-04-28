import {Component, OnInit} from '@angular/core';
import {QuizColorService} from "../../../services/quiz-color.service";
import {QuizColor} from "../../../models/quiz-color.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-color-view-list',
  templateUrl: './quiz-color-view-list.component.html',
  styleUrls: ['./quiz-color-view-list.component.scss']
})
export class QuizColorViewListComponent implements OnInit {

  quizList: QuizColor[];

  constructor(private quizColorService: QuizColorService, private route: Router) {

  }

  ngOnInit(): void {
    this.retrieveFromServer();
  }

  retrieveFromServer() {
    this.quizColorService.quiColorsList$.subscribe((list) => {
      this.quizList = list;
    })
  }

  getData() {
    return this.quizColorService.returnMapping2DArray();
  }

  launchQuizColor(id, i: QuizColor[]) {
    console.log("Index of this quiz :", i);
    this.quizColorService.setSelectedQuizColor(i);

    this.route.navigate(['lancement-quiz-color/' + id])
  }

  doSomething() {

  }
}
