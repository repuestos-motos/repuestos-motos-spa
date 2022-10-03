import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthenticationService,
    public toastService: ToastService
  ) { }

}
