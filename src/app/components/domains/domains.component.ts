import {Component, OnInit} from '@angular/core';
import {DomainService} from '../../services/domain.service';
import {Domain} from '../../models/domain';
import {Competition} from '../../models/competition';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-domains',
  templateUrl: 'domains.component.html'
})
export class DomainsComponent implements OnInit {

  domains: Domain[];

  constructor(private domainService: DomainService) {
  }

  ngOnInit() {
    this.domainService.getAllDomains().subscribe((domains: Domain[]) => {
      this.domains = domains;
    });
  }

}
