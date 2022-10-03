import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User;

  constructor(private auth: AuthenticationService) {
    this.user = this.auth.getUserInfo();
  }

}
