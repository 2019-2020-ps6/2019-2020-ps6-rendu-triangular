import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    //this.quizService.quizzes$.next(this.quizService.getQuizList());
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.userArrayOfAnswer = new Array();
  }

  onInput(event: Event) {
    this.userInput = (event.target as HTMLTextAreaElement).value;
    this.userArrayOfAnswer.push(parseInt(this.userInput));
    this.userArrayOfAnswercopy = this.userArrayOfAnswer;
    console.log(this.userArrayOfAnswer);
  }

  public getUserArrayOfAnswercopy() {
    return this.userArrayOfAnswercopy;
  }

}
