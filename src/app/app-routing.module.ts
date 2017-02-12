import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './home/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component'
import { RegisterComponent } from './register/register.component'
import { CompetitionsComponent } from './competitions/competitions.component'
import { CompetitionComponent } from './competitions/competition.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

// Define the routes
const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'competitions',
    component: CompetitionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'competition/:id',
    component: CompetitionComponent,
  },
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
