import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {AuthentificationService} from "../../../services/authentification.service";
import {Patient} from "../../../models/Patient.model";

@Component({
  selector: 'app-view-list-quiz',
  templateUrl: './view-list-quiz.component.html',
  styleUrls: ['./view-list-quiz.component.scss']
})
export class ViewListQuizComponent implements OnInit {

  public quizList: Quiz[] = [];
  connectedUser: User;
  patientData: Patient;
  quizPatients: Quiz[];

  constructor(private router: Router, public quizService: QuizService, private auth: AuthentificationService, private userService: UserService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.auth.loggedUser$.subscribe((user) => {
      this.connectedUser = user;
    })

    this.userService.patients$.subscribe((patients) => {
      if (patients !== undefined) {
        for (let pat of patients) {
          if (pat.firstName === this.connectedUser.firstName && pat.lastName === this.connectedUser.lastName) {
            this.patientData = pat;
            break;
          }
        }
      }
    })
    this.quizPatients = this.quizList.filter((data) => data.assigneeList.includes(this.patientData.firstName));
    console.log(this.quizPatients);

  }

  ngOnInit(): void {
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
}
