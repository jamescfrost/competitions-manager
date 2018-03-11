import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import {GlobalDataService} from '../../../services/globals.service';

@Component({ template: ''})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private globalDataService: GlobalDataService) {}

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['']);
    this.globalDataService.shareObj['domains'] = null;
  }
}
