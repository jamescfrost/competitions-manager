import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionsService } from './services/competitions.service';
import { CompetitionEditorComponent } from './competition-editor/competition-editor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { UserService } from  './services/user.service'
import { AuthGuard } from './guards/auth.guard'

import { routes } from './app.routes';
import {AuthenticationService} from "./services/authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    CompetitionEditorComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
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
