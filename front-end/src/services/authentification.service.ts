import {Subject} from "rxjs";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConnectedUser} from "../models/connected-user.model";

@Injectable()
export class AuthentificationService {
  userIsAuthentified: boolean = false;
  public loggedUser$ = new Subject<User>();
  private allDataUser: User = null;
  private connectedUser: ConnectedUser;
  private connectedUserList: ConnectedUser[];
  private userList: User[];
  private url = 'http://localhost:9428/api/connected-user';
  private urlUserList = 'http://localhost:9428/api/users';

  constructor(private http: HttpClient) {
    this.getConnectedUserList();
    this.getUserList();
    this.getConnectedUser();
  }

  getUserList() {
    //get the complete list from users to check
    this.http.get<User[]>(this.urlUserList).subscribe((list) => {
      this.userList = list;
    })
  }

  getConnectedUser() {
    this.http.get<ConnectedUser>(this.url).subscribe((connectedUser) => {
      this.connectedUser = connectedUser;
      this.allDataUser = this.parseToUser();
      this.loggedUser$.next(this.allDataUser);
      this.userIsAuthentified = this.allDataUser.firstName !== undefined;
    })
  }

  getConnectedUserList() {
    this.http.get<ConnectedUser[]>(this.url).subscribe((list) => {
      this.connectedUserList = list;
    })
  }

  logIn(user: User) {
    //convert User to Connected User
    const connectedU = this.parseToConnectedUser(user);
    this.loggedUser$.next(user);

    if (this.allDataUser === null) {
      this.http.post<ConnectedUser>(this.url, connectedU).subscribe((arg) => {
        this.allDataUser = user;
      })
      this.loggedUser$.next(user);
      this.userIsAuthentified = true;
    }
  }

  logOff(user: User) {

    const connectedU = this.parseToConnectedUser(user);

    if (this.allDataUser !== null) {
      const path = this.url + "/" + connectedU._id;
      this.http.delete<ConnectedUser>(path).subscribe((arg) => {
        console.log(arg.username + "deleted")
      })
      this.allDataUser = null;
      this.loggedUser$.next(this.allDataUser)
      this.userIsAuthentified = false;
    }

  }

  parseToConnectedUser(user: User): ConnectedUser {
    console.log(user)
    const connectedU = new ConnectedUser();
    connectedU.username = user.firstName;
    connectedU.signInDate = new Date();
    connectedU.signOutDate = null;

    for (let connectedUser of this.connectedUserList) {
      if (user.firstName === connectedUser.username)
        return connectedUser;
    }
    return connectedU;
  }

  parseToUser(): User {
    for (let user of this.userList) {
      for (let connectTedUser of this.connectedUserList) {
        if (connectTedUser.username === user.firstName)
          return user;
      }
    }
    return null;
  }

  getAllDataUser(): User {
    return this.allDataUser;
  }
}
