import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileservicesService } from '../Services/UserServices/profileservices.service';
import { AuthService } from '../Services/UserServices/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.authService.getUserRole();

    if (this.authService.isAuthenticated() && userRole) {
      const requiredRoles = route.data['roles'] as Array<string>;
      if (requiredRoles) {
        const hasRole = requiredRoles.includes(userRole);
        if (!hasRole) {
          this.router.navigate(['unauthorized']);
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
