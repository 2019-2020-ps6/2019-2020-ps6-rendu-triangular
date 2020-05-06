import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private auth: AuthentificationService) {
  }

  ngOnInit(): void {
  }

}
