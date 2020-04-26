import {Subject} from "rxjs";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthentificationService {
  userIsAuthentified: boolean = false;
  public loggedUser$ = new Subject<User>();
  private connectedUser: User;

  constructor(private http: HttpClient) {
    this.getConnectedUser();
  }

  getConnectedUser() {

  }

  logIn(user: User) {
    this.getConnectedUser();
    this.userIsAuthentified = true;
  }

  logOff() {
    this.userIsAuthentified = false;
  }

  updateUser() {
    this.loggedUser$.next(this.connectedUser);
  }
}
