import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConnectionDialogComponent} from "../../matDialogs/connection-dialog/connection-dialog.component";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  dialog: MatDialogRef<ConnectionDialogComponent>;

  @Output()
  accountSuccessfulEmitter: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private router: Router, private matDialog: MatDialog) {
    this.initForm();
  }

  ngOnInit(): void {
    this.userService.getUsersFromServer();
    this.userService.emitUsers();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  typeSelectController() {
    let selector = document.getElementById("exampleFormControlSelect1") as HTMLOptionElement;

    if (selector.value === "1")
      return "Patient"

    return "Admin";
  }

  onSubmitForm() {
    const newUser: User = this.userForm.getRawValue() as User;
    newUser.type = this.typeSelectController();
    newUser.age = Number(this.userForm.value['age']);

    this.userService.addUser(newUser);

    if (newUser.type === 'Patient') {
      this.userService.addPatient(newUser);
    }

    this.dialog = this.matDialog.open(ConnectionDialogComponent, {
      hasBackdrop: true
    })

    this.dialog.componentInstance.message = 'Commpte Crée';

    this.accountSuccessfulEmitter.emit(newUser);
    console.log(this.accountSuccessfulEmitter);
    this.router.navigate(['/accueil']);
  }
}
