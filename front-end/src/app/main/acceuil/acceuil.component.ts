import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthentificationService} from "../../../services/authentification.service";

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  hid: boolean = true;
  @ViewChild('alert', {static: false}) private alertContainer: ElementRef;

  constructor(private auth: AuthentificationService) {
  }

  ngOnInit(): void {
  }

  async hideAlert() {
    this.alertContainer.nativeElement.hidden = true;
    this.hid = true;
  }

  showAlert() {
    this.alertContainer.nativeElement.hidden = false;
    this.hid = false
    setTimeout(function () {
    }, 3000);
    this.hideAlert().then(r => console.log("hidden"));
    this.hid = true;
  }

  checkIfConnected() {
    if (!this.auth.userIsAuthentified)
      this.showAlert()
  }

}
