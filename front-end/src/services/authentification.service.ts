import {Subject} from "rxjs";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthentificationService {
  userIsAuthentified: boolean = false;
  public loggedUser$ = new Subject<User>();
  private connectedUser: User;

  constructor() {
    this.getConnectedUser();
  }

  logIn(user: User) {
    this.userIsAuthentified = true;
    this.loggedUser$.next(user);
  }

  logOff() {
    this.loggedUser$.next(undefined);
    this.connectedUser = undefined;
    this.userIsAuthentified = false;
  }

  getConnectedUser() {
    return this.loggedUser$.subscribe((connected) => {
      this.connectedUser = connected;
      this.updateUser();
    })
  }

  updateUser() {
    this.loggedUser$.next(this.connectedUser);
  }
}
