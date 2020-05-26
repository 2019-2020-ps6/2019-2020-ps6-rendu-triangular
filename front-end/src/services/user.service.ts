import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {httpOptionsBase} from "../configs/server.config";
import {AuthentificationService} from "./authentification.service";
import {Patient} from "../models/Patient.model";

@Injectable()
export class UserService {
  public usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  public singleUserSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private patients: Patient[] = [];
  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>(null);
  public singlePatient$: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(null);
  private users: User[] = [];
  public pageObservable$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private httpOptions = httpOptionsBase;

  private usersUrl: string = 'http://localhost:9428/api/users';
  private patientUrl: string = 'http://localhost:9428/api/users/patients'

  constructor(private http: HttpClient, private auth: AuthentificationService) {
    this.getUsersFromServer();
    this.getPatientsFromServer();
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
      this.emitSingleUser(user);
    })
  }

  deleteUser(user: User) {
    const pathTodeletion = this.usersUrl + '/' + user._id;
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
      if (id.toString().localeCompare(user._id.toString()))
        return user;
    }
  }

  getPatientsFromServer() {
    this.http.get<Patient[]>(this.patientUrl).subscribe((patients) => {
      this.patients = patients;
      this.patients$.next(this.patients);
    })
  }

  addPatient(user: User) {
    const patient = new Patient();
    patient.age = user.age;
    patient.firstName = user.firstName;
    patient.lastName = user.lastName;

    this.http.post<Patient>(this.patientUrl, patient).subscribe((patient) => {
      console.log("Patient Succesfully Added" + patient)
    })
    this.patients$.next(this.patients);
  }

  updatePatient(patient: Patient) {
    const url = this.patientUrl + '/' + patient._id;
    console.log(patient)
    this.http.put<Patient>(url, patient).subscribe(() => {
      console.log("updated");
    })
  }

  deletePatient(id: string) {
    const url = this.patientUrl + '/' + id;
    this.http.delete(url).subscribe(() => console.log("patient user deleted in patient"))
  }
}
