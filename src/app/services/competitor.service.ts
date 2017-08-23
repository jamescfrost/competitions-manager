import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Competitor} from '../models/competitor';
import {Observable} from 'rxjs';

@Injectable()
export class CompetitorService {

  constructor(private authHttp: AuthHttp) {}

  getAllCompetitors(): Observable<Competitor[]> {
    return this.authHttp.get('/api/competitors')
      .map(res => res.json());
  }

  getAllCompetitorsByGroupTag(groupTag: string): Observable<Competitor[]> {
    return this.authHttp.get('/api/competitors/' + groupTag)
      .map(res => res.json());
  }

  getCompetitor(id: string): Observable<Competitor> {
    return this.authHttp.get('/api/competitor/' + id)
      .map(res => res.json());
  }

  saveCompetitor(competitor: Competitor): Observable<Competitor> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (competitor._id == null) {
      return this.authHttp.post('/api/competitor', JSON.stringify(competitor), {headers: headers})
        .map(res => res.json());
    }
    return this.authHttp.put('/api/competitor/' + competitor._id, JSON.stringify(competitor), {headers: headers})
      .map(res => res.json());
  }

}
