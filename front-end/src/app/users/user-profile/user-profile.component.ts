import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input()
  id: any;

  @Input()
  receivedUser: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
