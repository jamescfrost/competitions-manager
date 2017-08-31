import {Component, OnInit} from '@angular/core';
import {DomainService} from '../../services/domain.service';
import {CompetitionService} from '../../services/competition.service';
import {CompetitorService} from '../../services/competitor.service';
import {Domain} from '../../models/domain';
import {Competition} from '../../models/competition';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-competitions',
  templateUrl: 'competitions.component.html'
})
export class CompetitionsComponent implements OnInit {

  domains: Domain[] = [];
  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService, private domainService: DomainService) {
  }

  ngOnInit() {
    this.domainService.getAllDomains()
      .subscribe((domains: Domain[]) => {
        for (const domain of domains) {
          this.competitionService.getAllCompetitions(domain._id).subscribe((competitions: Competition[]) => {
            for (const competition of competitions) {
              competition.domainName = domain.name;
              this.competitions.push(competition);
              console.log(competition);
            }
          });
        }
      });
  }

}
