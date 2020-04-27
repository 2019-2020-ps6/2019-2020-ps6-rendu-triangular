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
  }

  ngOnInit(): void {
    this.retrieveFromServer();
  }

  retrieveFromServer() {
    this.quizColorService.quiColorsList$.subscribe((list) => {
      this.quizList = list;
    })
  }

  public getGroupOfQuizColor(): string[] {
    let groupOfQuizColor = [];
    groupOfQuizColor.push(this.quizList[0].name);
    let num = 0;

    for (let i = 1; i < this.quizList.length; i++) {
      if (groupOfQuizColor[num] != this.quizList[i].name) {
        num++;
        groupOfQuizColor.push(this.quizList[i].name);
      }
    }
    return groupOfQuizColor;
  }

  deleteAColorCard(quiz) {
    this.quizColorService.deleteOnequiz(quiz);
    console.log("Quiz supprimé");
  }

}
