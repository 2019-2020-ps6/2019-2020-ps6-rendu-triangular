import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Patient} from "../../../models/Patient.model";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {QuizColorService} from "../../../services/quiz-color.service";
import {QuizColor} from "../../../models/quiz-color.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-quiz-assign',
  templateUrl: './quiz-assign.component.html',
  styleUrls: ['./quiz-assign.component.scss']
})
export class QuizAssignComponent implements OnInit {
  patientList: Patient[];

  quizzesImages: Quiz[];

  quizzesColor: QuizColor[][];

  @ViewChildren('checkboxImage') checkBoxesImage: QueryList<any>;

  @ViewChildren('checkboxColor') checkBoxesColor: QueryList<any>;

  @ViewChild('Validation') assign: ElementRef;

  selectedQuizImage: Quiz[] = [];

  selectQuizColor: QuizColor[] = [];

  constructor(private quizService: QuizService, private quizColorService: QuizColorService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.quizService.quizzes$.subscribe((list) => {
      this.quizzesImages = list;
    })

    this.quizColorService.quizColor2D$.subscribe((arr) => {
      this.quizzesColor = arr;
    })

    this.userService.patients$.subscribe((patients) => {
      this.patientList = patients;
      console.log(patients);
    })
  }

  getCheckBoxImage() {
    this.selectedQuizImage = [];
    const checked = this.checkBoxesImage;
    let checkedQuiz = [], uncheckQuiz = [];
    let index = 0;

    checked.forEach(data => {
      if (data.checked)
        checkedQuiz.push(index);
      else if (!data.checked)
        uncheckQuiz.push(index);
      index++;
    })

    console.log("checked Image :" + checkedQuiz);
    console.log("unchecked Image :" + uncheckQuiz)

    checkedQuiz.forEach(index => {
      this.selectedQuizImage.push(this.quizzesImages[index]);
    })
    console.log(this.selectedQuizImage)
  }


  getCheckBoxColor() {
    this.selectQuizColor = [];
    const checked = this.checkBoxesColor;
    let checkedQuiz = [], uncheckQuiz = [];
    let index = 0;

    checked.forEach(data => {
      if (data.checked)
        checkedQuiz.push(index);
      else if (!data.checked)
        uncheckQuiz.push(index);
      index++;
    })

    console.log("checked color :" + checkedQuiz);
    console.log("unchecked color :" + uncheckQuiz)

    checkedQuiz.forEach(index => {
      this.quizzesColor[index].forEach((i) => {
        this.selectQuizColor.push(i);
      })
    })
    console.log(this.selectQuizColor);
  }

  assignToPatient() {

  }
}
