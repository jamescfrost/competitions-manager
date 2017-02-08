import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './home/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component'
import { UserService } from  './services/user.service'
import { AuthGuard } from './guards/auth.guard'
import { NotFoundComponent } from './not-found/not-found.component'
import { CompetitionsComponent } from './competitions/competitions.component'
import { CompetitionComponent} from './competitions/competition.component'
import { CompetitionsService} from './services/competitions.service'


import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from "./services/authentication.service";

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
    UserService,
    CompetitionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

