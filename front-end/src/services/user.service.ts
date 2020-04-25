import {User} from "../models/user.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {httpOptionsBase} from "../configs/server.config";
import {AuthentificationService} from "./authentification.service";

@Injectable()
export class UserService {
  public usersSubject$ = new Subject<User[]>();
  public singleUserSubject$ = new Subject<User>();
  private users: User[] = [];
  private httpOptions = httpOptionsBase;

  private usersUrl: string = 'http://localhost:9428/api/users';

  constructor(private http: HttpClient, private auth: AuthentificationService) {
  }

  getUsersFromServer() {
    this.http.get<User[]>(this.usersUrl).subscribe((userList) => {
      this.users = userList;
      this.emitUsers();
    })
  }

  getSingleUserByid(userId: string) {
    const url = this.usersUrl + '/' + userId;
    this.http.get<User>(url).subscribe((user) => {
      this.emitSingleUser(user);
    })
  }

  addUser(user: User) {
    console.log(user);
    this.http.post<User>(this.usersUrl, user, this.httpOptions).subscribe(() => {
      this.getUsersFromServer();
    })
    this.emitSingleUser(user);
  }

  deleteUser(user: User) {
    const pathTodeletion = this.usersUrl + '/' + user.id;
    console.log('user')
    this.http.delete<User>(pathTodeletion, this.httpOptions).subscribe(() => {
      this.getUsersFromServer();
    })
    this.emitSingleUser(user);
  }

  emitUsers() {
    this.usersSubject$.next(this.users);
  }

  emitSingleUser(user: User) {
    this.singleUserSubject$.next(user);
  }

  getAllUsers() {
    return this.users;
  }

  getUserbyId(id: number) {
    for (let user of this.users) {
      if (id.toString().localeCompare(user.id.toString()))
        return user;
    }
  }
}
