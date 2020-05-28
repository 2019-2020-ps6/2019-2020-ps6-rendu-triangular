import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "../../matDialogs/delete-user-dialog/delete-user-dialog.component";
import {Patient} from "../../../models/Patient.model";
import {Quiz} from "../../../models/quiz.model";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = this.userService.getAllUsers();
  userSubscription: Subscription = new Subscription();
  patients: Patient[];
  quizList: Quiz[];

  constructor(private userService: UserService, private matDialog: MatDialog,
              private quizService: QuizService, private router: Router) {
    this.userSubscription = this.userService.usersSubject$.subscribe((users) => {
      this.users = users;
    })
    this.userService.emitUsers();
    this.userService.patients$.subscribe((list) => {
      this.patients = list;
    })
    this.quizService.quizzes$.subscribe((list) => {
      this.quizList = list;
    })
  }

  ngOnInit(): void {
    this.userService.getUsersFromServer();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  deleteAUser() {
    let selector = document.getElementById("select") as HTMLOptionElement;

    for (let user of this.users) {
      if (user._id.toString() === selector.value.toString()) {
        console.log('userFound :' + user);
        this.userService.deleteUser(user);
        break;
      }
    }
  }

  deleteUserDialog() {
    this.matDialog.open(DeleteUserDialogComponent, {
      hasBackdrop: true
    })
  }

  launchQuiz() {
    let s = (document.getElementById('select')) as HTMLSelectElement;
    let selIndex = s.selectedIndex;
    let quizz = s.options[selIndex];
    console.log(quizz.label);

    let quizzes: Quiz[];
    quizzes = this.quizList.filter(quiz => quiz.name === quizz.label);
    this.router.navigate(['lancement/' + quizzes[0]._id])
  }
}
