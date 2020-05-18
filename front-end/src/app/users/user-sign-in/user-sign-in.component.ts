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
  accountLoggedEmitter: EventEmitter<User> = new EventEmitter<User>();

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
    if (this.authService.getAllDataUser() != undefined)
      this.router.navigate(['/accueil']);
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onConnectUser() {
    const userLogIn: User = this.userForm.getRawValue() as User;
    for (let user of this.userList) {
      if (user.firstName === userLogIn.firstName && user.password === userLogIn.password) {
        this.accountLoggedEmitter.emit(user);
        this.authService.loggedUser$.next(user);
        this.authService.logIn(userLogIn);
        this.router.navigate(['/accueil'])
        return;
      }
    }
    this.accountNotFound = true;
  }

}
