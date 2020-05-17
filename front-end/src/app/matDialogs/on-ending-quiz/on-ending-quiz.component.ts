import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-on-ending-quiz',
  templateUrl: './on-ending-quiz.component.html',
  styleUrls: ['./on-ending-quiz.component.scss']
})
export class OnEndingQuizComponent implements OnInit {
  scoreFinal: Number;
  quiz: Quiz;

  constructor(private quizService: QuizService, private router: Router) {
  }

  ngOnInit(): void {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    })

    this.quizService.finalScore$.subscribe((data) => {
      this.scoreFinal = data;
    })
  }

  rejouer() {
    //this.router.navigate(['lancement/' + this.quiz._id]);
    window.location.reload();
  }

  arreter() {
    this.router.navigate(['view-list-quiz']);
  }

}
