import {Component, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from 'src/services/quiz.service';
import {ActivatedRoute} from '@angular/router';


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

  nombre: number;

  rightAnswerIndex: number;

  answerIsCorrect: boolean;

  @Output()
  scoreFinal: number;
  numberOfFails: number;


  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);

    //this.quizService.quizzes$.next(this.quizService.getQuizList());
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.userArrayOfAnswer = new Array();
    this.nombre = 0;
    this.scoreFinal = 0;
    this.numberOfFails = 0;
    this.answerIsCorrect = false;

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

  }

  public getUserArrayOfAnswercopy() {
    return this.userArrayOfAnswercopy;
  }

  increment() {
    let modal = (<HTMLElement>document.getElementById("ModalRejouer"));

    if (this.answerIsCorrect) {
      this.nombre++;
      this.userArrayOfAnswer = [];
      this.answerIsCorrect = false;
    } else if (this.nombre == this.quiz.questions.length - 1) {
      //hide modal for the last question
      //modal.hidden = true;
    }
  }

  processUserAnswer() {
    let questionAnswers = this.quiz.questions[this.nombre].answers;

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

    } else //Make a pop up wrong answer
    {
      this.answerIsCorrect = false;
      this.numberOfFails++;
    }

    console.log("nomber :" + this.nombre);
    console.log("user input :" + this.userArrayOfAnswer[0]);
    console.log("right answer :" + (this.rightAnswerIndex + 1));
    console.log("Answer is correct ? :" + this.answerIsCorrect);
  }

  refreshComponent() {
    window.location.reload();
  }

}
