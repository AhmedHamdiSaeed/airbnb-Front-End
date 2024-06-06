import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: ProfileservicesService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.service.token;

    // Clone the request to add the new header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    // Pass on the cloned request instead of the original request
    return next.handle(authReq);
  }
}
