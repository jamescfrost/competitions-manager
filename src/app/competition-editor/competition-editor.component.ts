import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { CompetitionsService } from '../services/competitions.service';
//import { Competition } from '../competition';

@Component({
  moduleId: module.id,
  templateUrl: 'competition-editor.component.html',
})
export class CompetitionEditorComponent {
  //competition: Competition;

  constructor(
    private competitionsService: CompetitionsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
/*    this.route.params
      .switchMap((params: Params) => this.competitionService.getCompetition(params['id']))
      .subscribe(competition => {
        console.log(competition);
        this.competition = competition
      });*/
  }

  /*
   addCompetition(event: Event) {
   event.preventDefault();
   var newCompetition = new Competition();
   newCompetition.name = this.name;
   this.competitionService.addCompetition(newCompetition)
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
   }
   */
}
