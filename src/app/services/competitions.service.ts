import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class CompetitionsService {

  constructor(private authHttp: AuthHttp) {}

  getAllCompetitions() {
    return this.authHttp.get('/api/competitions')
      .map(res => res.json());
  }

}
