import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent implements OnInit {

  @Input()
  quiz: Quiz;

  pointsGagne: number;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.quizService.quizzes$.next(this.quizService.getQuizList());
    this.calulateRightAnswers();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.pointsGagne = 0;
  }

  calulateRightAnswers() {
    for (let i = 0; i < this.quiz.questions.length; i++) {
      for (let j = 0; j < this.quiz.questions[i].answers.length; j++) {
        if (this.quiz.questions[i].answers[j].isCorrect && this.quizService.getAnswerArray()[j] === this.quiz.questions[i].answers[j])
          this.pointsGagne++;
      }
    }
  }

}
