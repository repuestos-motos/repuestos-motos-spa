import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  constructor(private router: Router, public authService: AuthenticationService) {
  }
  
  ngAfterViewInit(): void {
  }

}
