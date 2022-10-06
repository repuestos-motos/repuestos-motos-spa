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
    console.log('Navbar: ');
    console.log(this.navBar.nativeElement)
  }

  navbarBtnClick() {
    this.showNavbar = !this.showNavbar;
    if (this.showNavbar) {
      this.navBar.nativeElement.classList.add('show');
    } else {
      this.navBar.nativeElement.classList.remove('show');
    }
  }

  logout() {
    this.navbarBtnClick();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
