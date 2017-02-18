import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { CompetitionsService } from '../../services/competitions.service';
import { Competitor } from '../../models/competitor';

@Component({
  moduleId: module.id,
  templateUrl: 'competition.component.html',
})
export class CompetitionComponent implements OnInit {

  competitor: Competitor;
  types = ["Individual", "Team"];
  loading = false;

  constructor(private competitionsService: CompetitionsService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.competitionsService.getCompetition(params['id']))
      .subscribe(competition => {
        this.competitor = competition;
      });
  }

/*  saveCompetition(event: Event) {
    this.loading = true;
    event.preventDefault();
    this.competitionsService.saveCompetitor(this.competitor)
      .subscribe(competitor => {
        this.competitor = competitor;
        this.loading = false;
      })
  }*/


}
