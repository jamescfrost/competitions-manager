import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompetitionsService {

  constructor(private http: Http) { }

  // Get all competitions from the API
  getAllCompetitions() {
    return this.http.get('/api/competitions')
      .map(res => res.json());
  }

}
