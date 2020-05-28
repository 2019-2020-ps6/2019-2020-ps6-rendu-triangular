import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Patient} from "../../../models/Patient.model";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {QuizColorService} from "../../../services/quiz-color.service";
import {QuizColor} from "../../../models/quiz-color.model";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {QuizIsAssignedDialogComponent} from "../../matDialogs/quiz-is-assigned-dialog/quiz-is-assigned-dialog.component";

@Component({
  selector: 'app-quiz-assign',
  templateUrl: './quiz-assign.component.html',
  styleUrls: ['./quiz-assign.component.scss']
})
export class QuizAssignComponent implements OnInit {
  patientList: Patient[] = [];

  quizzesImages: Quiz[];

  quizzesColor: QuizColor[][];

  @ViewChildren('checkboxImage') checkBoxesImage: QueryList<any>;

  @ViewChildren('checkboxColor') checkBoxesColor: QueryList<any>;

  selectedPatient: Patient;

  selectedQuizImage: Quiz[] = [];

  selectQuizColor: QuizColor[] = [];

  constructor(private quizService: QuizService, private quizColorService: QuizColorService, private userService: UserService, private matDialog: MatDialog) {
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
      console.log(this.patientList);
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
    if (this.selectedPatient != undefined) {
      if (this.selectedQuizImage.length != 0) {
        this.selectedQuizImage.forEach((quiz) => {
          if (!this.quizExistInPatient(this.selectedPatient, quiz))
            this.selectedPatient.quizzesImage.push(quiz);
        })
        console.log(this.selectedPatient)
        this.userService.updatePatient(this.selectedPatient);
      }

      if (this.selectQuizColor.length != 0) {
        this.selectQuizColor.forEach((quiz) => {
          if (!this.quizExistInPatient(this.selectedPatient, quiz))
            this.selectedPatient.quizzesColor.push(quiz);
        })
        console.log(this.selectedPatient)
        this.userService.updatePatient(this.selectedPatient);
      }
    }

    if (this.selectedPatient !== undefined && (this.selectQuizColor.length != 0 || this.selectedQuizImage.length != 0)) {
      this.matDialog.open(QuizIsAssignedDialogComponent, {
        hasBackdrop: true

      })

      //Assignation du noms des patients sur les quiz
      for (let quiz of this.selectedQuizImage) {
        if (!this.patientExistInQuiz(this.selectedPatient, quiz)) {
          quiz.assigneeList.push(this.selectedPatient.firstName);
          this.quizService.editQuiz(quiz);
        }
      }

      /*for (let quiz of this.selectQuizColor){
        quiz.assigneeList.push(this.selectedPatient.firstName);
      }*/
    }

    this.selectedQuizImage = [];
    this.selectQuizColor = [];
  }

  getSelectedPatient(value) {
    const patient = this.patientList.filter(patient => patient.firstName === value.value);
    this.selectedPatient = patient[0];
  }

  quizExistInPatient(patient: Patient, quiz: Quiz | QuizColor) {
    let exist = false;
    for (let sm of patient.quizzesImage) {
      if (sm._id === quiz._id)
        exist = true;
    }
    return exist;
  }

  patientExistInQuiz(patient: Patient, quiz: Quiz) {
    let exist = false;
    for (let qui of quiz.assigneeList) {
      if (patient.firstName === qui)
        exist = true;
    }
    return exist;
  }

}
