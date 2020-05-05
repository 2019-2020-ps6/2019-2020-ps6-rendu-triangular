import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {User} from "../models/user.model";
import {AuthentificationService} from "../services/authentification.service";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{

  currentUser: User;

  Accueil = 'Accueil';
  APropos = 'A Propos';
  GestionQuiz = 'Gestion Quiz';
  Lancement = 'Lancement';

  @Input()
  connectedUser: User;

  sideNavIsClicked: boolean

  showdropdownContent: boolean;


  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 1}, (_, i) => `Accueil`);

  fillerContent = Array.from({length: 1}, () =>
    ``);

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthentificationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.authService.loggedUser$.subscribe((user) => {
      this.currentUser = user;
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  manageNav() {
    if (this.sideNavIsClicked === false) {

      this.sideNavIsClicked = true;
    } else {
      this.sideNavIsClicked = false;
    }

  }

  toggle() {
    if (this.sideNavIsClicked === false)
      return "hidden";

    return "visible";
  }

  closeNav() {
    let nav = document.getElementById("sidebar-wrapper") as HTMLDivElement;
    nav.style.visibility = "hidden";
    this.sideNavIsClicked = false;
  }

  mouseEnterQuizDropdown() {
    this.showdropdownContent = true;
  }

  mouseLeaveQuizDropdown() {
    this.showdropdownContent = false;
  }

  logOff() {
    this.authService.logOff(this.connectedUser);
  }


}
