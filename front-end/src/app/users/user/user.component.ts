import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  userData: User;

  userSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

}
