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

  public quizList: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit() {
    this.quizService.quizzes$.next(this.quizService.getQuizList());
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  editQuiz(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/' + quiz.id]);
}

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  modifyQuiz(quiz: Quiz){
    this.router.navigate(['/modify-quiz/' + quiz.id]);
  }
}
