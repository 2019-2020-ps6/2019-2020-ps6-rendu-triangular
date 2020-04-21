import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

}
