import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
      name: [''],
      theme: ['']
    });

  }

  ngOnInit(): void {
  }

  modifyQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.editQuiz(this.quiz, quizToCreate);
  }

}
