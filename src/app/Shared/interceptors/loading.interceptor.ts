import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { ProfileservicesService } from '../../Services/UserServices/profileservices.service';
import { LoaderService } from './loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadService.loader();

    return next.handle(req).pipe(
      delay(500),
      finalize(() => {
        this.loadService.hidingLoader();
      })
    );
  }
}
