import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modify-quiz',
  templateUrl: './modify-quiz.component.html',
  styleUrls: ['./modify-quiz.component.scss']
})
export class ModifyQuizComponent implements OnInit {

  public quizForm: FormGroup;

  @Input()
  quiz: Quiz;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      image: ['']
    });

    this.quizService.quizSelected$.subscribe((sm) => {
      this.quiz = sm;
    });

  }

  ngOnInit(): void {
    this.quizService.quizzes$.next(this.quizService.getQuizList());
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  modifyQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    if (this.quizForm.valid) {
      quizToCreate._id = this.quiz._id;
      quizToCreate.questionIndex = 0;
      this.quizService.editQuiz(quizToCreate);
    }

  }

}
