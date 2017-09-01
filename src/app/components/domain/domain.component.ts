import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DomainService} from '../../services/domain.service';
import {CompetitionService} from '../../services/competition.service';
import {CompetitorService} from '../../services/competitor.service';
import {Domain} from '../../models/domain'
import {Competition} from '../../models/competition'
import {Competitor} from '../../models/competitor'
import {Observable} from 'rxjs/Observable';
import {ObjectWrapper} from '../../models/object-wrapper'

@Component({
  moduleId: module.id,
  templateUrl: 'domain.component.html',
})
export class DomainComponent implements OnInit {

  domain: Domain;

  constructor(private domainService: DomainService,
              private competitionService: CompetitionService,
              private competitorService: CompetitorService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const domainId = params['id'];

      this.domainService.getDomain(domainId).subscribe((domain: Domain) => {
        this.domain = domain;
        console.log(this.domain);
      });
    });
  }

}
