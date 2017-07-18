import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

import {User} from '../models/user';


import * as constants from '../app/config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';


import { NavController } from 'ionic-angular';

class ServerResponse {
	constructor(public resource: any) {
	}
};

@Injectable()
export class UserService 
{
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_user'; 
	constructor(private httpService: BaseHttpService, private nav: NavController) {};


	
    private handleError (error: any) 
    {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}
	
	get_userinfo (id: string, params?: URLSearchParams): Observable<User> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl + '/' + id, { search: params ,headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let user: User = User.fromJson(result);
				return user;
			}).catch(this.handleError);
	};

	save (master_user: User): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl, master_user.toJson(true),options)
				.map((response) => {
					return response;
				});
		
	}

	getall_users (params?:URLSearchParams): Observable<User[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let users: Array<User> = [];
				result.resource.forEach((user) => {
					users.push(User.fromJson(user));
				});
				return users;
			}).catch(this.handleError);
	};

}
