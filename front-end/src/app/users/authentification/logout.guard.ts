import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from "../../../services/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanDeactivate<boolean> {

  constructor(private auth : AuthentificationService) {
  }

  canDeactivate(component: boolean,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.userIsAuthentified;
  }
}
