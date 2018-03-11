import {CommonModule} from '@angular/common';
import {CompetitionsComponent} from './components/competitions/competitions.component';
import {CompetitionComponent} from './components/competition/competition.component';
import {CompetitionCompetitorsComponent} from './components/competition/competition-competitors.component';
import {FormsModule} from '@angular/forms';
import {Ng2AutoCompleteModule} from '../ng2-auto-complete';
import {DndModule} from 'ng2-dnd';
import {NgModule} from '@angular/core';
import {CompetitionService} from '../services/competition.service';
import {CompetitorService} from '../services/competitor.service';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    CompetitionsComponent,
    CompetitionComponent,
    CompetitionCompetitorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: 'competitions',
        component: CompetitionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'competition/:competitionId',
        component: CompetitionComponent,
        canActivate: [AuthGuard]
      }
    ]),
    Ng2AutoCompleteModule,
    DndModule.forRoot()
  ],
})

export class CompetitionsModule {
}

