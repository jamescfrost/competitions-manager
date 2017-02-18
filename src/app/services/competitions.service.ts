import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Competition} from "../models/competition";
import {Competitor} from "../models/competitor";

@Injectable()
export class CompetitionsService {

  constructor(private authHttp: AuthHttp) {}

  getAllCompetitions() {
    return this.authHttp.get('/api/competitions')
      .map(res => res.json());
  }

  getCompetition(id: number) {
    return this.authHttp.get('/api/competition/' + id)
      .map(res => res.json());
  }

  saveCompetition(competition: Competition) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.authHttp.put('/api/competition/' + competition._id, JSON.stringify(competition), {headers: headers})
      .map(res => res.json());
  }

  addCompetitor(competitor: Competitor) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.authHttp.post('/api/competitor/', JSON.stringify(competitor), {headers: headers})
      .map(res => res.json());
  }
}
