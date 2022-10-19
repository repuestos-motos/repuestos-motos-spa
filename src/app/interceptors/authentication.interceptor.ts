import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAutenticationHeader(request)).pipe(
      map(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 403) {
              this.router.navigate(['login']);
            }
            this.authService.setAccessToken(event.headers.get('accessToken'));
          }
          return event;
        }
      ),
      catchError(
        error => {
          if (error.status === 401) {
            let queryParams = null;
            const route = this.authService.isSeller() ? '/login-vendedor' : '/login';
            if (this.router.url !== '/login' && this.router.url !== '/login-vendedor'
              && this.router.url !== '/' && this.router.url !== '') {
              queryParams = { returnUrl: this.router.url };
            }
            this.authService.logout();
            this.router.navigate([route], { queryParams });
          }
          throw error;
        }
      )
    );
  }

  addAutenticationHeader(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        accessToken: `${this.authService.getAccessToken()}`
      } 
    });
  }
}
