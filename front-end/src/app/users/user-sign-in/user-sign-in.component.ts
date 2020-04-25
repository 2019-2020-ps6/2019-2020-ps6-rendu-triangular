import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../services/authentification.service";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  @Output()
  accountLoggedEmitter: EventEmitter<any> = new EventEmitter<any>();

  userList: User[] = this.userService.getAllUsers();

  userSub: Subscription = new Subscription();

  userForm: FormGroup

  accountNotFound: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authService: AuthentificationService) {
    this.initForm();
    this.userSub = this.userService.usersSubject$.subscribe((list) => {
      this.userList = list;
    })

    this.userService.emitUsers();
  }

  ngOnInit(): void {
    this.userService.getUsersFromServer();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onConnectUser() {
    const userLogIn: User = this.userForm.getRawValue() as User;
    console.log(this.userList);
    console.log(userLogIn);
    for (let user of this.userList) {
      if (user.firstName === userLogIn.firstName && user.password === userLogIn.password) {
        this.accountLoggedEmitter.emit(true);
        this.router.navigate(['../accueil']);
        console.log("succefully Connected")
        this.authService.logIn(userLogIn);
        return;
      }
    }
    this.accountNotFound = true;
  }


}
