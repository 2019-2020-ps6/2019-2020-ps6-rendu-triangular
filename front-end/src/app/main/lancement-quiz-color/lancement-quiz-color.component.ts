import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizColorService} from "../../../services/quiz-color.service";
import {QuizColor} from "../../../models/quiz-color.model";


@Component({
  selector: 'app-lancement-quiz-color',
  templateUrl: './lancement-quiz-color.component.html',
  styleUrls: ['./lancement-quiz-color.component.scss']
})

export class LancementQuizColorComponent implements OnInit {

  quizColorSelectedId: string;

  quizColorList: QuizColor[];

  quiz2D: QuizColor[][] = this.quizColorService.getQuizColor2DArray();

  quizSelected: QuizColor[];

  indexOfPlay: number = 0;

  showColor: boolean = true;

  scoreForQuiz: number = 0;

  scoreForThreeCard: number = 0;

  indexOfGame: number = 0;


  constructor(private activatedRouter: ActivatedRoute, private quizColorService: QuizColorService, private route: Router) {

    this.callTimer();

    this.getSnapshot();
    this.retrieveDataFromServer();
    this.retrieve2DArray();
    this.retrieveSelectedQuiz();
  }

  ngOnInit(): void {
    localStorage.setItem("id", this.quizColorSelectedId);
  }

  getSnapshot() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.quizColorSelectedId = id;
    this.quizColorService.setSelectedQuizID(id);
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

  retrieveSelectedQuiz() {
    this.quizColorService.selectedQuiColor$.subscribe((quizColor) => {
      this.quizSelected = quizColor;
    })
  }

  findNumberOfPossiblePlay() {
    return this.quizSelected.length / 3;
  }

  trheeByThreeArray() {
    const copy = this.quizSelected;
    this.callTimer()
    clearTimeout(this.callTimer());

    return copy.slice(this.indexOfPlay, this.indexOfPlay + 3);
  }

  callTimer() {

    return <any>setTimeout(() => {
        this.showColor = false;
      }, 5000
    )
  }

  next() {
    if (this.checkUserInput()) {
      this.indexOfPlay += 3;
      this.showColor = true;
      this.scoreForThreeCard = 0;
      this.indexOfGame++;
      this.callTimer()
      this.scoreForQuiz++;

      if (this.indexOfGame >= this.findNumberOfPossiblePlay()) {
        //Fires a modal to end
        this.fireModal("modalBtnForEnding");
      }


      return true;
    } else {
      this.scoreForThreeCard = 0;
      this.showColor = false;
      this.fireModal("modalBtn");
      return false;
    }
  }

  operateScore() {
    let array = this.trheeByThreeArray();

    for (let a of array)
      this.scoreForThreeCard = Number(this.scoreForThreeCard) + Number(a.value);
  }

  checkUserInput() {
    let input = document.getElementById("réponse") as HTMLInputElement;
    this.operateScore();
    console.log(this.scoreForThreeCard)
    return Number(input.value) === this.scoreForThreeCard;
  }

  fireModal(name) {
    let modal = document.getElementById(name) as HTMLButtonElement;
    modal.click();
  }

  closeModal(name) {
    let modal = document.getElementById(name) as HTMLElement;
    modal.hidden = true;
    this.route.navigate(['quiz-color-view-list'])
  }
}
