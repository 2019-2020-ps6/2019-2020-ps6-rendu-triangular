import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {QuizColorService} from "../../../services/quiz-color.service";
import {QuizColor} from "../../../models/quiz-color.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-lancement-quiz-color',
  templateUrl: './lancement-quiz-color.component.html',
  styleUrls: ['./lancement-quiz-color.component.scss']
})


export class LancementQuizColorComponent implements OnInit {

  quizColorSelectedId: string;

  quizColorList: QuizColor[];

  quiz2D: QuizColor[][] = this.quizColorService.getQuizColor2DArray();

  indexes: number[] = this.checkIfIdIsInAnIndex();

  constructor(private router: ActivatedRoute, private quizColorService: QuizColorService, private route: Router) {

  }

  ngOnInit(): void {
    // Nest them together and
    this.router.queryParams.subscribe(queryParams => {
      this.router.params.subscribe(routeParams => {
        this.quizColorSelectedId = routeParams.id;
      });
    });

    this.route.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('Got the Event URL as ', event.url);
        if (event.urlAfterRedirects.includes('project')) {
          console.log('This was redirected to the Project Component');
        }
      });

    console.log("localstorage :" + localStorage.getItem("id"));
    localStorage.setItem("id", this.quizColorSelectedId);

    this.retrieveDataFromServer();
    this.retrieve2DArray();
  }

  retrieveDataFromServer() {
    this.quizColorService.getAllQuizColor();
    this.quizColorService.quiColorsList$.subscribe((list) => {
      this.quizColorList = list;
    })
  }

  retrieve2DArray() {
    this.quizColorService.quizColor2D$.subscribe((twoD) => {
      this.quiz2D = twoD;
    })
  }

  checkIfIdIsInAnIndex() {
    let lengthRow = this.quiz2D.length;
    let lengthcolumn = this.quiz2D[this.quiz2D.length - 1].length;
    let indexesOfLast = [];

    for (let i = 0; i < lengthRow; i++) {
      for (let j = 0; j < lengthcolumn; j++) {
        if (this.quiz2D[i][j].id.toString().localeCompare(this.quizColorSelectedId)) {
          indexesOfLast.push(i);
          indexesOfLast.push(j);
          return indexesOfLast;
        }
      }
    }
    return null;
  }

}
