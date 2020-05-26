import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {Patient} from "../../../models/Patient.model";

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  listOfUsers: User[]
  selectedUser: User;
  listPatients: Patient[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.usersSubject$.subscribe((list) => {
      this.listOfUsers = list;
    })

    this.userService.patients$.subscribe((list) => {
      this.listPatients = list;
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
    }
  }
}
