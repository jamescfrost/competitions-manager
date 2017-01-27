import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../services/competitions.service'

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html'
})
export class CompetitionsComponent implements OnInit {

  competitions: any[];

  constructor(private competitionsService: CompetitionsService) { }

  ngOnInit() {
    this.competitionsService.getAllCompetitions()
      .subscribe(competitions => {
        this.competitions = competitions;
      })
  }

}
