import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component'
import { AuthGuard } from './guards/auth.guard'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { DomainComponent } from './components/domain/domain.component'
import { DomainsComponent } from './components/domains/domains.component'
import { CompetitionsComponent } from './components/competitions/competitions.component'
import { CompetitionComponent} from './components/competition/competition.component'
import { DomainService} from './services/domain.service'
import { CompetitionService} from './services/competition.service'
import { CompetitorService} from './services/competitor.service'

import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from './services/authentication.service';

import { Ng2AutoCompleteModule } from './components/ng2-auto-complete/ng2-auto-complete.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    NotFoundComponent,
    DomainComponent,
    DomainsComponent,
    CompetitionsComponent,
    CompetitionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2AutoCompleteModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    DomainService,
    CompetitionService,
    CompetitorService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

