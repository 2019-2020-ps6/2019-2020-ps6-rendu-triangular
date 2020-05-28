import {Component, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from 'src/services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameRecorder} from "../../../models/game-recorder.model";
import {GameRecordService} from "../../../services/game-record.service";
import {interval} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {Question} from "../../../models/question.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WrongAnswerDialogComponent} from "../../matDialogs/wrong-answer-dialog/wrong-answer-dialog.component";
import {CorrectAnswerDialogComponent} from "../../matDialogs/correct-answer-dialog/correct-answer-dialog.component";
import {TooManyAnswerDialogComponent} from "../../matDialogs/too-many-answer-dialog/too-many-answer-dialog.component";
import {OnEndingQuizComponent} from "../../matDialogs/on-ending-quiz/on-ending-quiz.component";
import {User} from "../../../models/user.model";
import {AuthentificationService} from "../../../services/authentification.service";


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

  connectedUser: User;

  @Output()
  scoreFinal: number;
  numberOfFails: number;

  wrongAnswerDialog: MatDialogRef<WrongAnswerDialogComponent>;
  tooManyFailureDialog: MatDialogRef<TooManyAnswerDialogComponent>;
  correctAnswerDialog: MatDialogRef<CorrectAnswerDialogComponent>;
  onEndingDialog: MatDialogRef<OnEndingQuizComponent>;


  constructor(private route: ActivatedRoute, private router: Router, protected formBuilder: FormBuilder,
              private quizService: QuizService, private game: GameRecordService, private dialog: MatDialog,
              private auth: AuthentificationService) {
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

    this.auth.loggedUser$.subscribe((user) => {
      this.connectedUser = user;
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
    } else if (this.quiz.questionIndex === this.quiz.questions.length - 1) {
      finalBtn.disabled = true;

    } else if (this.quiz.questionIndex === this.quiz.questions.length) {
      if (this.answerIsCorrect) {
        this.isAtEnd = true;
      }
    }
    this.hideSeeSolution = true;

    if (this.quiz.questionIndex === this.quiz.questions.length) {
      this.fireOnEndingQuiz();
      this.update(0);
      localStorage.clear();
      return;
    }

    console.log("questionIndex :" + this.quiz.questionIndex)

    this.gameRecorder.numberOfAttempts = this.numberOfFails;
    this.gameRecorder.finalScore = this.scoreFinal;
    this.gameRecorder.endDate = new Date();
    this.gameRecorder.duration = this.tempsDeJeu;
    this.gameRecorder.typeOfQuiz = this.quiz.name;
    this.gameRecorder.patient = this.connectedUser;

    this.game.performGameRecorder(this.gameRecorder);
    this.game.performTempsDeJeu(this.tempsDeJeu);

    this.quizService.quizSelectedUpdater(this.quiz);
    this.quizService.performQuizIndex(this.quiz.questionIndex);
    this.update(this.quiz.questionIndex);
  }

  update(index: number) {
    const quizze = new Quiz();
    quizze._id = this.quiz._id;
    quizze.name = this.quiz.name;
    quizze.theme = this.quiz.theme;
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
      this.fireCorrectAnswerDialog();

      let inputToDisable = (<HTMLInputElement>document.getElementById("Réponse"));
      inputToDisable.disabled = true;
      this.scoreFinal++;
      if (finalBtn.disabled)
        finalBtn.disabled = false;


    } else //Make a pop up wrong answer
    {
      this.answerIsCorrect = false;
      this.numberOfFails++;
      this.fireWrongAnswerDialog();
      if (this.numberOfFails >= 10) {
        this.wrongAnswerDialog.close();
        this.fireTooManyAnswerDialog();
      }
    }

  }

  fireWrongAnswerDialog() {
    this.wrongAnswerDialog = this.dialog.open(WrongAnswerDialogComponent, {
      hasBackdrop: true
    });
  }

  fireCorrectAnswerDialog() {
    this.correctAnswerDialog = this.dialog.open(CorrectAnswerDialogComponent, {
      hasBackdrop: true
    })
  }

  fireTooManyAnswerDialog() {
    this.tooManyFailureDialog = this.dialog.open(TooManyAnswerDialogComponent, {
      hasBackdrop: true
    });

    this.quizService.rejouerLaPartieState.subscribe((state) => {
      if (state) {
        this.navigateToThebegining();
      }
    })
    this.quizService.rejouerLaPartieState.next(false);

    this.quizService.voirLaReponseState.subscribe((state) => {
      if (state) {
        this.seeCurrentSolution();
      }
    })
    this.quizService.voirLaReponseState.next(false);
  }

  fireOnEndingQuiz() {
    this.onEndingDialog = this.dialog.open(OnEndingQuizComponent, {
      hasBackdrop: true
    })

    this.onEndingDialog.componentInstance.scoreFinal = this.scoreFinal;
    this.onEndingDialog.componentInstance.quiz = this.quiz;
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
    localStorage.clear();
    window.location.reload();
  }

  seeCurrentSolution() {
    this.hideSeeSolution = false;
    this.tooManyFailureDialog.afterClosed().subscribe(result => {
      console.log(result);
    })
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
