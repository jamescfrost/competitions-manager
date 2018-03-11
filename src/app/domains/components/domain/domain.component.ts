import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DomainService} from '../../../services/domain.service';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitorService} from '../../../services/competitor.service';
import {Domain} from '../../../models/domain'
import {Competition} from '../../../models/competition'
import {Competitor} from '../../../models/competitor'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {GlobalDataService} from '../../../services/globals.service';

@Component({
  moduleId: module.id,
  templateUrl: 'domain.component.html',
})
export class DomainComponent implements OnInit {

  loading: boolean;
  domain: Domain;
  competitions: Competition[];
  competitors: Competitor[];

  constructor(private domainService: DomainService,
              private competitionService: CompetitionService,
              private competitorService: CompetitorService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      const domainId = params['domainId'];
      const tasks: Observable<any>[] = [];
      tasks.push(this.domainService.getDomain(domainId));
      tasks.push(this.competitionService.getAllCompetitions(domainId));
      tasks.push(this.competitorService.getAllCompetitors(domainId));

      Observable.forkJoin(tasks).subscribe(
        (results) => {
          this.domain = results[0];
          this.competitions = results[1].data;
          this.competitors = results[2];
          this.loading = false;
        });
    });

  }

}
