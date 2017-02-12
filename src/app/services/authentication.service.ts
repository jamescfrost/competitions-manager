import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {}

  isAuthenticated(): boolean {
    return tokenNotExpired();
  }

  login(username: string, password: string): Observable<boolean> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var credentials = { username: username, password: password };
    return this.http.post('/api/authenticate', JSON.stringify(credentials), {headers: headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          localStorage.setItem('id_token', token)
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('id_token');
  }
}
