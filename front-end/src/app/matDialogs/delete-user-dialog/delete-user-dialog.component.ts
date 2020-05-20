import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  listOfUsers: User[]
  selectedUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.usersSubject$.subscribe((list) => {
      this.listOfUsers = list;
    })
  }

  getUser(userName) {
    console.log(userName)
    const users = this.listOfUsers.filter(user => user.firstName.includes(userName))
    this.selectedUser = users[0];
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser);
  }
}
