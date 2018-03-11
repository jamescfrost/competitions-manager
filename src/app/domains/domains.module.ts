import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {HttpModule} from '@angular/http';
import {DomainComponent} from './components/domain/domain.component';
import {DomainsComponent} from './components/domains/domains.component';

@NgModule({
  declarations: [
    DomainComponent,
    DomainsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: 'domains',
        component: DomainsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'domain/:domainId',
        component: DomainComponent,
        canActivate: [AuthGuard]
      }
    ]),
  ]
})

export class DomainsModule {
}

