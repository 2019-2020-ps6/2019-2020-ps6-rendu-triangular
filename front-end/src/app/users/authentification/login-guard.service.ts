import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationStart,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../../../services/authentification.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConnectionDialogComponent} from "../../matDialogs/connection-dialog/connection-dialog.component";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  currentPage;

  authentificationDialog: MatDialogRef<ConnectionDialogComponent>

  constructor(private router: Router, private auth: AuthentificationService, private matDialog: MatDialog) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        this.currentPage = event.url;
        if (!this.auth.userIsAuthentified && this.currentPage === '/user-sign-in') {
          return true;
        }
      }
    })

    if (this.auth.userIsAuthentified) {
      return true;
    }
    return false;
  }

}

