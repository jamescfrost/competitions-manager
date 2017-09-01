import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Domain } from '../models/domain';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class DomainService {

  constructor(private authHttp: AuthHttp) {}

  getAllDomains(): Observable<Domain[]> {
    return this.authHttp.get('/api/domains')
      .map(res => res.json());
  }

  getDomain(domainId: string): Observable<Domain> {
    return this.authHttp.get('/api/domain/' + domainId)
      .map(res => res.json());
  }

}
