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
    let index2D = 0; // Store when quizzes are différents
    let quiz2D: QuizColor[][] = [];
    quiz2D[index2D] = [];
    quiz2D[index2D].push(this.quizList[0]);
    console.log(quiz2D);

    for (let i = 1; i < this.quizList.length; i++) {
      if (this.quizList[i - 1].name === this.quizList[i].name) {
        quiz2D[index2D].push(this.quizList[i - 1]);
      } else if (this.quizList[i - 1].name != this.quizList[i].name) {
        index2D++;
        quiz2D[index2D] = [];
      }
    }

    //console.log(this.quiz2D[0].length);
    //console.log(this.quiz2D[1].length);
    return quiz2D;
  }

  launchQuizColor(id) {
    this.route.navigate(['lancement-quiz-color/' + id])
  }

  doSomething() {

  }
}
