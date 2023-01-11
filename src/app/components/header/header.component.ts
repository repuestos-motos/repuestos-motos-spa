import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navBar') navBar: ElementRef;

  public showNavbar: boolean = false;
  public isAuthenticated: boolean = false;
  public userInfo: User | null = null;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.getAuthSubject().subscribe({
      next: value => {
        this.isAuthenticated = value.isAuthenticated;
        this.userInfo = value.isAuthenticated ? value.userInfo : null;
        this.cd.detectChanges();
      }
    });
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
