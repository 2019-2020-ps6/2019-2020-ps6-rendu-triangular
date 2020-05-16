import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from 'src/models/question.model';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QuestionComponent} from "../question/question.component";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  questionDialog: MatDialogRef<QuestionComponent>

  constructor(private quizService: QuizService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);

    for (let i = 0; i < this.quiz.questions.length; i++) {
      if (this.quiz.questions[i]._id === question._id) {
        this.quiz.questions.splice(i, i + 1);
        break;
      }
    }
    const quizToUpdate: Quiz = this.quiz;
    this.quizService.editQuiz(quizToUpdate);
  }

  displayClickedQuestion(question: Question) {

    this.questionDialog = this.dialog.open(QuestionComponent, {
      hasBackdrop: true,
    });

    this.questionDialog.componentInstance.question = question;
  }

  open(content: TemplateRef<any>) {

  }

}
