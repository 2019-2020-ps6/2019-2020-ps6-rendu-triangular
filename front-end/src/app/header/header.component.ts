import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthentificationService} from "../../services/authentification.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Accueil = 'Accueil';
  APropos = 'A Propos';
  GestionQuiz = 'Gestion Quiz';
  Lancement = 'Lancement';

  @Input()
  connectedUser: User;

  sideNavIsClicked: boolean

  showdropdownContent: boolean;

  sideBar: HTMLElement = document.getElementById("sidebar-wrapper") as HTMLElement;

  constructor(private authService: AuthentificationService) {
  }

  ngOnInit() {
    this.sideNavIsClicked = false;
    this.showdropdownContent = false;
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
