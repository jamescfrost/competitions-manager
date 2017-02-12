import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './home/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component'
import { AuthGuard } from './guards/auth.guard'
import { NotFoundComponent } from './not-found/not-found.component'
import { CompetitionsComponent } from './competitions/competitions.component'
import { CompetitionComponent} from './competitions/competition.component'
import { CompetitionsService} from './services/competitions.service'

import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from "./services/authentication.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
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
    CompetitionsComponent,
    CompetitionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    CompetitionsService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

