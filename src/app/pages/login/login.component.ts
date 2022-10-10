import { ActivatedRoute, Router } from '@angular/router';
  import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  public userName: string = '';
  public password: string = '';

  public loginError: boolean = false;
  public generalError: boolean = false;
  private queryParamsSubs: Subscription;
  private returnUrl: string = '';

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
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
    this.loginError = false;
    this.generalError = false;
    this.authService.login(this.userName, this.password).subscribe(
      {
        next: response => {
          this.router.navigate([this.returnUrl]);
        },
        error: response => {
          if (response.status === 403) {
            this.loginError = true;
          } else {
            this.generalError = true;
          }
          console.error(response);
        }
      }
    );
  }

}
