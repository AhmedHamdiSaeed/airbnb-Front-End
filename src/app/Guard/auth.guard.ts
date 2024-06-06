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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: ProfileservicesService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authService.getCurrentUser(); // Get the current user

    if (user && user.role === route.data['role']) {
      return true;
    } else {
      this.router.navigate(['/not-authorized']); // Redirect to a not-authorized page or login
      return false;
    }
  }
}
