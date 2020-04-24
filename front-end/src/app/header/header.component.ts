import {Component, OnInit} from '@angular/core';


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

  sideNavIsClicked: boolean

  showdropdownContent: boolean;

  sideBar: HTMLElement = document.getElementById("sidebar-wrapper") as HTMLElement;

  constructor() {
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

}
