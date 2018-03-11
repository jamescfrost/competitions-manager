import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {GlobalDataService} from './services/globals.service';
import {Domain} from './models/domain';
import {DomainService} from './services/domain.service';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  constructor(private authService: AuthenticationService,
              private globalDataService: GlobalDataService,
              domainService: DomainService,
              router: Router) {
    if (authService.isAuthenticated()) {
      domainService.getAllDomains().subscribe(
        function (domains: Domain[]) {
          globalDataService.shareObj['domains'] = domains;
        });
    };
  }

}
