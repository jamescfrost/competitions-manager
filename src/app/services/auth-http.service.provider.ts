import {Http, RequestOptions} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http, options);
}

export let AuthHttpProvider = {
  provide: AuthHttp,
  useFactory: authHttpServiceFactory,
  deps: [ Http, RequestOptions ]
}


