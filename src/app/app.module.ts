import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { DomainComponent } from './domains/components/domain/domain.component'
import { DomainsComponent } from './domains/components/domains/domains.component'
import { DomainService} from './services/domain.service'
import { CompetitionService} from './services/competition.service'
import { CompetitorService} from './services/competitor.service'

import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from './services/authentication.service';

import { Ng2AutoCompleteModule } from './ng2-auto-complete';

import { GlobalDataService} from './services/globals.service';
import {DndModule} from 'ng2-dnd';
import {IntegerValidatorDirective} from './directives/integer-validator.directive';
import {CompetitionsModule} from './competitions/competitions.module';
import {AuthHttpProvider} from './services/auth-http.service.provider';
import {HttpModule} from '@angular/http';
import {AccountsModule} from './accounts/accounts.module';
import {DomainsModule} from './domains/domains.module';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DashboardComponent,
    NotFoundComponent,
    IntegerValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    DndModule.forRoot(),
    AccountsModule,
    CompetitionsModule,
    DomainsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    DomainService,
    CompetitionService,
    CompetitorService,
    GlobalDataService,
    AuthHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

