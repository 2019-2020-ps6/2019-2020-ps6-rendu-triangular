import {Component} from '@angular/core';
import {User} from "../models/user.model";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: User;

  constructor(private authService: AuthentificationService) {
    this.authService.loggedUser$.subscribe((user) => {
      this.currentUser = user;
    })
  }

  title = 'Poly-Quiz';
}
