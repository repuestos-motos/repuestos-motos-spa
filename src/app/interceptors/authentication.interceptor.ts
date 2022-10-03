import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAutenticationHeader(request)).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.authService.setAccessToken(event.headers.get('Authorization'));
        }
        return event;
      })
    );
  }

  addAutenticationHeader(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        Authorization: `${this.authService.getAccessToken()}`
      } 
    });
  }
}
