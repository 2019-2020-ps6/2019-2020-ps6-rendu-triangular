import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../../../services/authentification.service";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  hid: Boolean = true

  constructor(private router: Router, private auth: AuthentificationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.userIsAuthentified) {
      return true;
    }

    this.hid = false;
    this.router.navigate(['/accueil']);
    return false;
  }

}

