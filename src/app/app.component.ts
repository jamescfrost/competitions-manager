import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  constructor(private authService: AuthenticationService, router: Router) {
    // if (!authService.isAuthenticated()) {
    //   router.navigate(['login']);
    // }
  }

}
