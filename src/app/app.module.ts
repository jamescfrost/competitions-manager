import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionsService } from './competitions.service'

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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent
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
