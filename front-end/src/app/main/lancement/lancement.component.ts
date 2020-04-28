import {Component, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from 'src/services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {GameRecorder} from "../../../models/game-recorder.model";
import {GameRecordService} from "../../../services/game-record.service";
import {interval} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {Question} from "../../../models/question.model";


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

  questionIndex: number

  hideSeeSolution: boolean = true;

  @Output()
  scoreFinal: number;
  numberOfFails: number;


  constructor(private route: ActivatedRoute, protected formBuilder: FormBuilder, private quizService: QuizService, private game: GameRecordService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
        this.quiz = quiz;
      }
    );

    this.game.gameRecorderList$.subscribe(sm => {
      this.gameRecorders = sm;
    })

    this.game.tempsDeJeu$.subscribe(sm => {
      this.tempsDeJeu = sm;
    })

    this.quizService.quizIndex$.subscribe((index) => {
      this.quiz.questionIndex = index;
    })

    this.quizService.perfomQuiz(this.quiz);
  }

  ngOnInit(): void {

    const counter = interval(1000);
    counter.subscribe(value => {
      this.tempsDeJeu = value;
    })

    this.quizService.quizzes$.next(this.quizService.getQuizList());
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);

    this.userArrayOfAnswer = [];
    this.nombre = 0;

    if (!this.isAtEnd)
      this.checkerEvolution();

    this.scoreFinal = 0;
    this.numberOfFails = 0;
    this.scoreEvolution();
    this.answerIsCorrect = false;
    this.isAtEnd = false;

    this.gameRecorder = new GameRecorder();
    this.gameRecorder.startDate = new Date();
  }

  onInput(event: KeyboardEvent) {
    this.userInput = (event.target as HTMLTextAreaElement).value;

    if (event.keyCode === 8) {
      this.userArrayOfAnswer = [];
    } else {
      this.userArrayOfAnswer.push(parseInt(this.userInput));
      this.userArrayOfAnswercopy = this.userArrayOfAnswer;
      console.log(this.userArrayOfAnswer);
    }
  }

  public getUserArrayOfAnswercopy() {
    return this.userArrayOfAnswercopy;
  }

  increment() {
    let finalBtn = (<HTMLButtonElement>document.getElementById("finishBtn"));

    if (this.answerIsCorrect) {
      this.nombre++;
      this.quiz.questionIndex++;

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
    this.hideSeeSolution = true;

    if (this.numberOfFails >= 10) {

    }

    this.gameRecorder.numberOfAttempts = this.numberOfFails;
    this.gameRecorder.finalScore = this.scoreFinal;
    this.gameRecorder.endDate = new Date();
    this.gameRecorder.duration = this.tempsDeJeu
    this.gameRecorder.typeOfQuiz = "Quiz Image";

    this.game.performGameRecorder(this.gameRecorder);
    this.game.performTempsDeJeu(this.tempsDeJeu);

    this.quizService.quizSelectedUpdater(this.quiz);
    this.quizService.performQuizIndex(this.quiz.questionIndex);
    this.update(this.quiz.questionIndex);
  }

  update(index: number) {
    const quizze = new Quiz();
    quizze.id = this.quiz.id;
    quizze.name = this.quiz.name;
    quizze.theme = this.quiz.theme;
    console.log(quizze);
    quizze.questionIndex = index;
    this.quizService.editQuiz(quizze);
  }

  processUserAnswer() {
    let questionAnswers = this.quiz.questions[this.quiz.questionIndex].answers;
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
      if (this.numberOfFails >= 10) {
        this.fireModal("modalBtnForQuitting");
      }
    }

  }

  fireModal(name) {
    let modal = document.getElementById(name) as HTMLButtonElement;
    modal.click();
  }

  refreshComponent() {
    localStorage.clear();
    window.location.reload();
    this.update(0);
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
    this.update(0);
  }

  navigateToThebegining() {
    this.quiz.questionIndex = 0;
    this.scoreFinal = 0;
    this.update(this.quiz.questionIndex);
    window.location.reload();
  }

  seeCurrentSolution() {
    this.hideSeeSolution = false;
  }

  findRightAnswer(question: Question) {
    let index = 1;
    for (let rep of question.answers) {
      if (rep.isCorrect) {
        return index;
      }
      index++;
    }
    return index;
  }
}
