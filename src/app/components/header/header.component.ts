import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('navBar') navBar: ElementRef;

  public showNavbar: boolean = false;

  constructor(private router: Router, public authService: AuthenticationService) {
  }
  
  ngAfterViewInit(): void {
  }

  navbarBtnClick() {
    this.showNavbar = !this.showNavbar;
    if (this.navBar) {
      if (this.showNavbar) {
        this.navBar.nativeElement.classList.add('show');
      } else {
        this.navBar.nativeElement.classList.remove('show');
      }
    }
  }

  logout() {
    this.navbarBtnClick();
    const isSeller = this.authService.isSeller();
    this.authService.logout();
    if (isSeller) {
      this.router.navigate(['/login-vendedor']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
