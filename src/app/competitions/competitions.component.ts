import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../services/competitions.service'

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
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
