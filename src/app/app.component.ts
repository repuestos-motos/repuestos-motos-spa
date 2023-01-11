import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from './services/toast.service';
import { PreloaderService } from './services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public preloader: boolean = false;

  constructor(
    public authService: AuthenticationService,
    public toastService: ToastService,
    public preloaderService: PreloaderService,
    private cd: ChangeDetectorRef
  ) {
  }
  
  ngOnInit(): void {
    this.preloaderService.subscribe({
      next: (v: boolean) => {
        this.preloader = v;
        this.cd.detectChanges();
      }
    });
  }

}
