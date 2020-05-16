import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'src/models/quiz.model';
import {Question} from 'src/models/question.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public questionForm: FormGroup;

  public sub: Subscription = new Subscription()

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addQuestion() {
    const question = this.questionForm.getRawValue() as Question;
    if (question.image === '')
      question.image = "https://images.assetsdelivery.com/compings_v2/will46/will461412/will46141200142.jpg";

    if (this.questionForm.valid) {
      this.quizService.performQuestion(question);

      this.quizService.addQuestion(this.quiz, question);
      this.quizService.updateQuizzes(this.quiz._id);
      this.initializeQuestionForm();

    }
  }

  ngOnInit() {
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      image: [''],
      answers: this.formBuilder.array([])
    });
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }


}
