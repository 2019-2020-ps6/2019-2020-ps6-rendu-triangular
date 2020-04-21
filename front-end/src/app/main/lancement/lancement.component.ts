import {Component, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from 'src/services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {GameRecorder} from "../../../models/game-recorder.model";
import {GameRecordService} from "../../../services/game-record.service";
import {interval} from "rxjs";


@Component({
  selector: 'app-lancement',
  templateUrl: './lancement.component.html',
  styleUrls: ['./lancement.component.scss']
})
export class LancementComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public userArrayOfAnswer;
  public userArrayOfAnswercopy;

  userInput: string;

  next: boolean;

  tempsDeJeu: number;

  nombre: number;

  rightAnswerIndex: number;

  answerIsCorrect: boolean;

  isAtEnd: boolean

  gameRecorder: GameRecorder;

  gameRecorders: GameRecorder[];

  @Output()
  scoreFinal: number;
  numberOfFails: number;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private game: GameRecordService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);

    this.game.gameRecorderList$.subscribe(sm => {
      this.gameRecorders = sm;
    })

    this.game.tempsDeJeu$.subscribe(sm => {
      this.tempsDeJeu = sm;
    })

    quizService.perfomQuiz(this.quiz);

  }

  ngOnInit(): void {

    const counter = interval(1000);
    counter.subscribe(value => {
      this.tempsDeJeu = value;
    })

    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.userArrayOfAnswer = new Array();
    this.nombre = 0;
    if (!this.isAtEnd)
      this.checkerEvolution();
    this.scoreFinal = 0;
    this.numberOfFails = 0;
    this.scoreEvolution();
    this.answerIsCorrect = false;
    this.isAtEnd = false;
    console.log("evolutionIndex :" + localStorage.getItem("evolutionIndex"));
    console.log("is at end :" + this.isAtEnd);
    console.log(this.answerIsCorrect);
    this.gameRecorder = new GameRecorder();
    this.gameRecorder.startDate = new Date();
  }

  onInput(event: KeyboardEvent) {
    this.userInput = (event.target as HTMLTextAreaElement).value;

    if (event.keyCode === 8) {
      this.userArrayOfAnswer = [];
      console.log("Backspace is pressed");
    } else {
      this.userArrayOfAnswer.push(parseInt(this.userInput));
      this.userArrayOfAnswercopy = this.userArrayOfAnswer;
      console.log(this.userArrayOfAnswer);
    }

    console.log("evolutionIndex :" + localStorage.getItem("evolutionIndex"));
    console.log("quiz.questionIndex :" + this.quiz.questionIndex);
  }

  public getUserArrayOfAnswercopy() {
    return this.userArrayOfAnswercopy;
  }

  increment() {
    let finalBtn = (<HTMLButtonElement>document.getElementById("finishBtn"));

    if (this.answerIsCorrect) {
      this.nombre++;
      this.quizService.modifyQuestionIndex(this.quiz);
      this.quizService.editQuiz(this.quiz);

      localStorage.setItem("evolutionIndex", String(this.nombre));
      localStorage.setItem("finalScore", String(this.scoreFinal));
      localStorage.setItem("numberOfAttempts", String(this.numberOfFails));

      this.userArrayOfAnswer = [];
      this.answerIsCorrect = false;
    } else if (this.nombre === this.quiz.questions.length - 1) {
      finalBtn.disabled = true;


    } else if (this.nombre === this.quiz.questions.length) {
      if (this.answerIsCorrect) {
        this.isAtEnd = true;

      }
    }

    this.gameRecorder.numberOfAttempts = this.numberOfFails;
    this.gameRecorder.finalScore = this.scoreFinal;
    this.gameRecorder.endDate = new Date();
    this.gameRecorder.duration = this.tempsDeJeu

    this.game.performGameRecorder(this.gameRecorder);
    this.game.performTempsDeJeu(this.tempsDeJeu);
  }

  processUserAnswer() {
    let questionAnswers = this.quiz.questions[this.nombre].answers;
    let finalBtn = (<HTMLButtonElement>document.getElementById("finishBtn"));

    //First find the right answer
    for (let i = 0; i < questionAnswers.length; i++)
      if (questionAnswers[i].isCorrect) {
        this.rightAnswerIndex = i;
        break;
      }

    //Check if the player is correct or not
    if (this.userArrayOfAnswer[0] == this.rightAnswerIndex + 1) {
      this.answerIsCorrect = true;

      let inputToDisable = (<HTMLInputElement>document.getElementById("Réponse"));
      inputToDisable.disabled = true;
      this.scoreFinal++;
      if (finalBtn.disabled)
        finalBtn.disabled = false;

    } else //Make a pop up wrong answer
    {
      this.answerIsCorrect = false;
      this.numberOfFails++;
    }

    console.log("Answer is correct ? :" + this.answerIsCorrect);
    console.log("evolutionIndex :" + localStorage.getItem("evolutionIndex"));
    console.log("quiz.questioniDex = " + this.quiz.questionIndex);
    console.log("is at end ? :" + this.isAtEnd);
  }

  refreshComponent() {
    localStorage.clear();
    window.location.reload();
  }

  checkerEvolution() {
    this.nombre = Number(localStorage.getItem("evolutionIndex"));
  }

  scoreEvolution() {
    this.scoreFinal = Number(localStorage.getItem("finalScore"));
    this.numberOfFails = Number(localStorage.getItem("numberOfAttempts"));
  }

  emptyLocalStorage() {
    localStorage.clear();
  }

}
