import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalFunctions } from '../../globals/global-functions';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardianService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (GlobalFunctions.isLogin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
