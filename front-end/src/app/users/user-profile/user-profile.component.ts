import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {AuthentificationService} from "../../../services/authentification.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  receivedUser: User;

  constructor(private auth: AuthentificationService) {
  }

  ngOnInit(): void {
    this.auth.loggedUser$.subscribe((user) => {
      this.receivedUser = user;
    })
  }

}
