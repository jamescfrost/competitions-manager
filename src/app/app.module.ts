import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionsService } from './services/competitions.service';
import { CompetitionEditorComponent } from './competition-editor/competition-editor.component'

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'competitions',
    pathMatch: 'full'
  },
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: 'competition-editor/:id',
    component: CompetitionEditorComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    CompetitionEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CompetitionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
