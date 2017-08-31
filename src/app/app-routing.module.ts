import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component'
import { RegisterComponent } from './components/register/register.component'
import { CompetitionsComponent } from './components/competitions/competitions.component'
import { CompetitionComponent } from './components/competition/competition.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { DomainComponent } from './components/domain/domain.component';
import { DomainsComponent } from './components/domains/domains.component';

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
    path: 'domains',
    component: DomainsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'domain/:id',
    component: DomainComponent,
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
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

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
