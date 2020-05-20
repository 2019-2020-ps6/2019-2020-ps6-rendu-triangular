import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "../../matDialogs/delete-user-dialog/delete-user-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = this.userService.getAllUsers();
  userSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private matDialog: MatDialog) {
    this.userSubscription = this.userService.usersSubject$.subscribe((users) => {
      this.users = users;
    })
    this.userService.emitUsers();
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
}
