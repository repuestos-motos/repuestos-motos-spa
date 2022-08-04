import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAutenticationHeader(request));
  }

  addAutenticationHeader(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        Authorization: `BAERER ${this.authService.getAccessToken()}`
      } 
    });
  }
}
