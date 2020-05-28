import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {Patient} from "../../../models/Patient.model";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  listOfUsers: User[]
  selectedUser: User;
  listPatients: Patient[];
  quizlist: Quiz[];

  constructor(private userService: UserService, private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.userService.usersSubject$.subscribe((list) => {
      this.listOfUsers = list;
    })

    this.userService.patients$.subscribe((list) => {
      this.listPatients = list;
    })

    this.quizService.quizzes$.subscribe((list) => {
      this.quizlist = list;
    })
  }

  getUser(userName) {
    console.log(userName.value)
    const users = this.listOfUsers.filter(user => user.firstName === userName.value)
    this.selectedUser = users[0];
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser);
    if (this.selectedUser.type === 'Patient') {
      let pat = this.listPatients.filter((patient) => patient.firstName === this.selectedUser.firstName && patient.lastName === this.selectedUser.lastName);
      this.userService.deletePatient(pat[0]._id);
      let quizzes = this.quizlist.filter((quiz) => quiz.assigneeList.includes(this.selectedUser.firstName));
      for (let i = 0; i < quizzes.length; i++) {
        for (let j = 0; j < quizzes[i].assigneeList.length; j++) {
          if (quizzes[i].assigneeList[j] === this.selectedUser.firstName) {
            quizzes[i].assigneeList.splice(j, 1);
            this.quizService.editQuiz(quizzes[i]);
          }
        }
      }
    }
  }
}
