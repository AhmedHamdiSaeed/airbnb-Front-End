import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserClaims(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  public getUserRole(): string | null {
    const claims = this.getUserClaims();
    if (claims) {
      return (
        claims[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || null
      );
    }
    return null;
  }
  public getUserName(): string | null {
    const claims = this.getUserClaims();
    if (claims) {
      return (
        claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
        null
      );
    }
    return null;
  }

  public getUserEmail(): string | null {
    const claims = this.getUserClaims();
    if (claims) {
      return (
        claims[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ] || null
      );
    }
    return null;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
