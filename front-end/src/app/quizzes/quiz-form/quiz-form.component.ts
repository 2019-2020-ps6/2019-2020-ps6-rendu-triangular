import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;

  imagePreview: string;
  @ViewChild('image') imageContainer: ElementRef;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      image: [''],
      questionIndex: 0
    });
  }

  ngOnInit() {
    //this.quizService.quizzes$.next(this.quizService.getQuizList());
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.questions = [];
    if (quizToCreate.image === '')
      quizToCreate.image = 'https://medias.liberation.fr/photo/1269696-p-tit-libe-les-droits-de-l-enfant-menu-quiz.png?modified_at=1573658071&ratio_x=03&ratio_y=02&width=750'

    this.quizService.addQuiz(quizToCreate);
  }
}
