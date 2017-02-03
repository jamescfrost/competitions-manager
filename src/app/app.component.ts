import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  constructor(private authService: AuthenticationService) {

  }

}
