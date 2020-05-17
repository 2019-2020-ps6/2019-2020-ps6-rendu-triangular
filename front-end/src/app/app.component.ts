import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {AuthentificationService} from "../services/authentification.service";
import {MediaMatcher} from "@angular/cdk/layout";
import {NavigationStart, Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  Accueil = 'Accueil';

  connectedUser: User;

  mobileQuery: MediaQueryList;

  currentPage: string;

  fillerNav = Array.from({length: 1}, (_, i) => `Accueil`);

  fillerContent = Array.from({length: 1}, () =>
    ``);

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthentificationService, private router: Router, private userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        this.currentPage = event.url;
        this.userService.pageObservable$.next(event.url);
      }
    })


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
  }

  pageChecker() {
    if (this.currentPage === '/user-sign-in')
      return false;
    if (this.currentPage === '/user-form')
      return false;
    if (this.currentPage === '/quiz-form')
      return false;
    if (this.currentPage.includes('/lancement'))
      return false;
    if (this.currentPage.includes('/edit-quiz'))
      return false;

    return true;
  }
}
