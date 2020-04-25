import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../../services/authentification.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-user-profil-view',
  templateUrl: './user-profil-view.component.html',
  styleUrls: ['./user-profil-view.component.scss']
})
export class UserProfilViewComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthentificationService) {
    this.authService.loggedUser$.subscribe((user) => {
      this.currentUser = user;
      console.log("current user in " + this.currentUser);
    })
  }

  ngOnInit(): void {
  }

}
