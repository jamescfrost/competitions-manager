import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import {Domain} from '../../../models/domain';
import {DomainService} from '../../../services/domain.service';
import {GlobalDataService} from '../../../services/globals.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private domainService: DomainService,
    private globalDataService: GlobalDataService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/dashboard']);
          this.domainService.getAllDomains().subscribe(
              function (domains: Domain[]) {
                this.globalDataService.shareObj['domains'] = domains;
          });
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
