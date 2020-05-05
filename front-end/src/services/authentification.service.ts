import {Subject} from "rxjs";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SafeHtml} from "@angular/platform-browser";

@Injectable()
export class AuthentificationService {
  userIsAuthentified: boolean = false;
  public loggedUser$ = new Subject<User>();
  private connectedUser: User;
  private url = 'http://localhost:9428/api/connected-user';

  constructor(private http: HttpClient) {
    this.getConnectedUser();
  }

  getConnectedUser() {
    return  this.http.get<User>(this.url).subscribe( (connectedUser) =>{
      this.connectedUser = connectedUser;
      this.loggedUser$.next(connectedUser);
    })
  }

  logIn(user: User) {

    if (this.connectedUser === undefined){
      this.http.post<User>(this.url, user).subscribe((arg) =>{
        this.connectedUser = arg;
        console.log(arg.firstName + "connected")
      })
      this.loggedUser$.next(user);
    }

    this.userIsAuthentified = true;
  }

  logOff(user : User) {

    if (this.connectedUser !== undefined){
      const path = this.url + "/" + user.id;
      this.http.delete<User>(path).subscribe((arg) =>{
        console.log(arg.firstName + "deleted")
      })
    }

    this.userIsAuthentified = false;
  }

}
