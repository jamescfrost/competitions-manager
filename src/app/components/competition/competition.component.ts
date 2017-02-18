import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { CompetitionsService } from '../../services/competitions.service';
import { Competition } from '../../models/competition';

@Component({
  moduleId: module.id,
  templateUrl: 'competition.component.html',
})
export class CompetitionComponent implements OnInit {

  competition: Competition;
  types = ["League", "Knockout", "League and Knockout"];
  loading = false;

  constructor(private competitionsService: CompetitionsService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.competitionsService.getCompetition(params['id']))
      .subscribe(competition => {
        this.competition = competition;
      });
  }

  saveCompetition(event: Event) {
    this.loading = true;
    event.preventDefault();
    this.competitionsService.saveCompetition(this.competition)
      .subscribe(competition => {
        this.competition = competition;
        this.loading = false;
      })
  }

  /*  addCompetition(event: Event) {
   event.preventDefault();
   var newCompetition = new Competition();
   newCompetition.name = this.name;
   this.competitionsService.addCompetition(newCompetition)
   .subscribe(competition => {
   this.competitions.push(competition);
   this.name = '';
   })
   }

   deleteCompetition(id: string) {
   this.competitionService.deleteCompetition(id)
   .subscribe(data => {
   console.log(data);
   if (data.n == 1) {
   for (var i = 0; i < competitions.length; i++) {
   if (competitions[i]._id == id) {
   competitions.splice(i, 1);
   }
   }
   }
   })
   }*/

}
