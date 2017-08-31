import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Competition} from '../models/competition';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class CompetitionService {

  constructor(private authHttp: AuthHttp) {}

  getAllCompetitions(domain: String): Observable<Competition[]> {
    return this.authHttp.get(`/api/${domain}/competitions`)
      .map(res => res.json());
  }

  getCompetition(id: string): Observable<Competition> {
    return this.authHttp.get('/api/competition/' + id)
      .map(res => res.json());
  }

  saveCompetition(competition: Competition): Observable<Competition> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.authHttp.put('/api/competition/' + competition._id, JSON.stringify(competition), {headers: headers})
      .map(res => res.json());
  }

}
