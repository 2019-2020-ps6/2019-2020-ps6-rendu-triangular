import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-too-many-answer-dialog',
  templateUrl: './too-many-answer-dialog.component.html',
  styleUrls: ['./too-many-answer-dialog.component.scss']
})
export class TooManyAnswerDialogComponent implements OnInit {

  rejouerLaPartie: boolean = false;
  voirLareponse: boolean = false;

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.quizService.voirLaReponseState.subscribe((state) => {
      this.voirLareponse = state;
    })

    this.quizService.rejouerLaPartieState.subscribe((state) => {
      this.rejouerLaPartie = state;
    })
  }

  rejouerIsClicked() {
    this.rejouerLaPartie = true;
    this.quizService.rejouerLaPartieState.next(this.rejouerLaPartie);
    console.log("rejouer is clicked");
  }

  voirReponseIsClicked() {
    this.voirLareponse = true;
    this.quizService.voirLaReponseState.next(this.voirLareponse);
    console.log("voir la réponse is clicked");
  }

}
