import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CompetitionService} from '../../services/competition.service';
import {CompetitorService} from '../../services/competitor.service';
import {Competition} from '../../models/competition'
import {Competitor} from '../../models/competitor'
import {Observable} from 'rxjs/Observable';
import {ObjectWrapper} from '../../models/object-wrapper'

@Component({
  moduleId: module.id,
  templateUrl: 'domain.component.html',
})
export class DomainComponent implements OnInit {

  constructor(private competitionService: CompetitionService,
              private competitorService: CompetitorService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
