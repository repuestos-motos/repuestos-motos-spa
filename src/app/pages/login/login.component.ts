import { ActivatedRoute, Router } from '@angular/router';
  import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  public userName: string = '';
  public password: string = '';

  public errorMessage: string = '';
  private queryParamsSubs: Subscription;
  private returnUrl: string = '';

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private preloader: PreloaderService,
    private router: Router    
  ) {
    this.queryParamsSubs = this.activatedRoute.queryParams.subscribe({
      next: (params: any) => {
        this.returnUrl = params.returnUrl ? params.returnUrl : ''; 
      }
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubs?.unsubscribe();
  }

  login() {
    this.errorMessage = '';
    this.preloader.block();
    this.authService.login(this.userName, this.password).subscribe(
      {
        next: response => {
          this.preloader.unblock();
          this.router.navigate([this.returnUrl]);
        },
        error: response => {
          this.preloader.unblock();
          if (response.status === 400) {
            this.errorMessage = 'Usuario y/o contraseña incorrectos.';
          } else {
            this.errorMessage = 'Se produjo un error al intentar iniciar sesión.';
          }
          console.error(response);
        }
      }
    );
  }

}
