import {Component, OnInit, Output} from '@angular/core';


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

  constructor() {
  }

  ngOnInit() {
  }

}
