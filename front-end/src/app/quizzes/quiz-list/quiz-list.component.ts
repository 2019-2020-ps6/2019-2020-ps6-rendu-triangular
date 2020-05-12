import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizList: Quiz[];
  nombre: number;

  constructor(private router: Router, public quizService: QuizService) {
  }

  ngOnInit() {
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quizList = quizzes;
    });

    this.nombre = 0;
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  editQuiz(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/' + quiz._id]);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  modifyQuiz(quiz: Quiz) {
    this.router.navigate(['/modify-quiz/' + quiz._id]);
  }

  increment() {
    this.nombre++;
  }

}
