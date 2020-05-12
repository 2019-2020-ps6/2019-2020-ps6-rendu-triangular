import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {AuthentificationService} from "../services/authentification.service";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  Accueil = 'Accueil';

  connectedUser: User;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 1}, (_, i) => `Accueil`);

  fillerContent = Array.from({length: 1}, () =>
    ``);

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthentificationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe((user) => {
      this.connectedUser = user;
    })
    console.log(this.connectedUser);
    console.log("userIsAuthenficated : " + this.authService.userIsAuthentified);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOutUser() {
    this.authService.logOff(this.connectedUser);
    this.authService.userIsAuthentified = false;
    window.location.reload();
    console.log("userIsAuthenficated : ", this.authService.userIsAuthentified);
  }

}
