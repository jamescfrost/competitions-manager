import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
        {
          path: 'dashboard',
          component: DashboardComponent,
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
      ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
