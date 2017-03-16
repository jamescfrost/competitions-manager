import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../services/competition.service'
import { Competition } from '../../models/competition'

@Component({
  selector: 'app-competitions',
  templateUrl: 'competitions.component.html'
})
export class CompetitionsComponent implements OnInit {

  competitions: Competition[];

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.competitionService.getAllCompetitions()
      .subscribe(competitions => {
        this.competitions = competitions;
      })
  }

}
