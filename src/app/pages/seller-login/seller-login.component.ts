import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent {

  public userName: string;
  public password: string;
  public errorMessage: string = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  login() {
    this.errorMessage = '';
    this.auth.sellerLogin(this.userName, this.password).subscribe({
      next: (resp: any) => {
        this.router.navigate(['']);
      },
      error: response => {
        if (response.status === 403) {
          this.errorMessage = 'Usuario y contraseña incorrectos';
        } else {
          this.errorMessage = 'Se produjo un error al iniciar sesión';
        }
        console.error(response);
      }
    });
  }

}
