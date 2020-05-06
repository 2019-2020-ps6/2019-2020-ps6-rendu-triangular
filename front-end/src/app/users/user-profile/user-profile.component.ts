import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  receivedUser: User;
  listOfUsers: User[];

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.listOfUsers = this.userService.getAllUsers();
  }

  ngOnInit(): void {
    this.setMatchingUser();
  }

  setMatchingUser() {
    let name = this.route.snapshot.paramMap.get('id');

    for (let user of this.listOfUsers) {
      if (user.firstName === name)
        this.receivedUser = user;
      console.log(name)

    }
  }


}
