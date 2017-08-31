import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'default.component.html'
})

export class DefaultComponent {

  constructor(private authService: AuthenticationService, router: Router) {
    if (authService.isAuthenticated()) {
      router.navigate(['/dashboard']);
    }
  }
}
