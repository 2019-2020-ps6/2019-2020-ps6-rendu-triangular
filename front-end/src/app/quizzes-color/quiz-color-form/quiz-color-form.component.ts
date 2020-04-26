import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuizColor} from "../../../models/quiz-color.model";
import {QuizColorService} from "../../../services/quiz-color.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-color-form',
  templateUrl: './quiz-color-form.component.html',
  styleUrls: ['./quiz-color-form.component.scss']
})
export class QuizColorFormComponent implements OnInit {

  valSquare1: number
  valSquare2: number
  valSquare3: number

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizColorService: QuizColorService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      valSquare1: ['', Validators.required],
      valSquare2: ['', Validators.required],
      valSquare3: ['', Validators.required],
      generation: ['', Validators.required]
    })
  }

  changeInputVal1() {
    let val = document.getElementById("valeurQuiz1") as HTMLInputElement;
    this.valSquare1 = Number(val.value);
  }

  changeInputVal2() {
    let val = document.getElementById("valeurQuiz2") as HTMLInputElement;
    this.valSquare2 = Number(val.value);
  }

  changeInputVal3() {
    let val = document.getElementById("valeurQuiz3") as HTMLInputElement;
    this.valSquare3 = Number(val.value);
  }

  createSetOfQuizColor() {
    let maxGeneration = this.formGroup.get('generation').value;

    for (let i = 0; i < maxGeneration; i++)
      this.createOneRowQuiz();

    console.log("set of " + maxGeneration + "created");
    this.router.navigate(['../quiz-color-list']).then(r => {

    });
  }

  createOneRowQuiz() {
    let colors = ["blue", "yellow", "greenyellow"]
    let valSquares = [this.formGroup.get('valSquare1').value, this.formGroup.get('valSquare2').value, this.formGroup.get('valSquare3').value]
    let random;

    for (let i = 0; i < 3; i++) {
      const quiz = new QuizColor();
      random = this.randomIntFromInterval(0, 2);

      quiz.name = this.formGroup.controls['name'].value;
      quiz.color = colors[random];
      quiz.value = valSquares[random];

      this.quizColorService.addQuiztoList(quiz);
      console.log("one quiz created");
      console.log(quiz);
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
