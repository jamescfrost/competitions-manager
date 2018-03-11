import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Competitor} from '../../../models/competitor'
import {ObjectWrapper} from '../../../models/object-wrapper'

@Component({
  selector: 'app-competition-competitors',
  templateUrl: 'competition-competitors.component.html',
})
export class CompetitionCompetitorsComponent {
@Input() availableCompetitors: Competitor[];
@Input() competitors: ObjectWrapper[] = [];

  addCompetitor(competitor?: any) {
    if (competitor == null) {
      competitor = '';
    }
    const competitorWrapper = new ObjectWrapper(competitor);
    this.competitors.push(competitorWrapper);
  }

  removeCompetitor(competitorWrapper: ObjectWrapper) {
    const index = this.competitors.indexOf(competitorWrapper);
    if (index > -1) {
      this.competitors.splice(index, 1);
    }
  }


}
