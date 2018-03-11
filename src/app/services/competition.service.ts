import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Competition} from '../models/competition';
import {Observable} from 'rxjs/Observable'
import {ServiceResult} from '../models/service-result';

@Injectable()
export class CompetitionService {

  constructor(private authHttp: AuthHttp) {}

  getAllCompetitions(domainId: String): Observable<ServiceResult> {
    return this.authHttp.get('/api/competitions/' + domainId)
      .map(res => res.json());
  }

  getCompetition(id: String): Observable<ServiceResult> {
    return this.authHttp.get('/api/competition/' + id)
      .map(res => res.json());
  }

  saveCompetition(competition: Competition): Observable<ServiceResult> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.authHttp.put('/api/competition/' + competition._id, JSON.stringify(competition), {headers: headers})
      .map(res => res.json());
  }

}
