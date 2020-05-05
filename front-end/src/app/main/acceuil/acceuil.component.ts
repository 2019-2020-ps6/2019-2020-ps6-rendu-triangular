import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SafeHtml} from "@angular/platform-browser";
import {AuthentificationService} from "../../../services/authentification.service";

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  @ViewChild('alert', { static : false}) private alertContainer: ElementRef;

  constructor(private auth : AuthentificationService) {
  }

  ngOnInit(): void {
    console.log(this.alertContainer.nativeElement.value)
  }

  async hideAlert(){
    this.alertContainer.nativeElement.hidden = true;
  }

  showAlert(){
    this.alertContainer.nativeElement.hidden = false;
    setTimeout(function(){
    },3000);
    this.hideAlert().then(r => console.log("hidden"));
  }

}
