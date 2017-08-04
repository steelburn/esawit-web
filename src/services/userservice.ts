import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

import {User} from '../models/user';
import {UserIMEI} from '../models/user';

import {USER_LOCATION_MODEL} from '../models/user';
import {USER_LOCATION_ENTRY} from '../models/user';

import { LocationModel } from '../models/location';



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
	baseResourceUrl_master_location: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_location';

	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_user';
	baseResource_Url:string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/';
    baseResourceUrl_user_imei: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/user_imei';
baseResourceUrl_user_location: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/users_location';
	constructor(private httpService: BaseHttpService, private nav: NavController) {};


	remove_userlocation (id: string) 
	{
		console.log('remove_vehicledriver');
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.delete(this.baseResourceUrl_user_location + '/' + id,{ headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				//console.log(result.driver_GUID);
				return response;
			});
	}

    private handleError (error: any) 
    {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}
	
	Deactive_User (usermodel: User) 
	{
		console.log(usermodel);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		if (usermodel.userID) 
		{
			return this.httpService.http.patch(this.baseResourceUrl, usermodel.toJson(true),options)
			.map((data) => {
				return data;
			});
		} 
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
				.map((response) => 
				{
					return response;
				});
		
	}

	save_user_imei (user_imei: UserIMEI): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl_user_imei, user_imei.toJson(true),options)
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

	Update (user: User) 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		// if (driver.driver_GUID) 
		// {
			return this.httpService.http.patch(this.baseResourceUrl , user.toJson(true),options)
			.map((data) => {
				return data;
			});
		// } 
	}
	
	get_IMEI(params?: URLSearchParams): Observable<UserIMEI[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getpendingimei_view', { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				//console.log(result);
				let user_imeis: Array<UserIMEI> = [];
				result.resource.forEach((user_imei) => {
					user_imeis.push(UserIMEI.fromJson(user_imei));
				});
				console.log('Getting IMEIS');
				console.log(user_imeis);console.log('ENDING IMEI');
				return user_imeis;

			}).catch(this.handleError);
	}

	getLocations_byuser (id:string,params?: URLSearchParams): Observable<USER_LOCATION_MODEL[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getlocationby_user_view?filter=user_GUID='+id, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				//console.log(result);
				let get_selectlocations: Array<USER_LOCATION_MODEL> = [];
				result.resource.forEach((get_selectlocation) => {
					get_selectlocations.push(USER_LOCATION_MODEL.fromJson(get_selectlocation));
				});
				//console.log(get_selectlocations);
				return get_selectlocations;

			}).catch(this.handleError);
	};

	get_AvailableLocations (params?: URLSearchParams): Observable<LocationModel[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl_master_location, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getlocations: Array<LocationModel> = [];
				result.resource.forEach((getlocation) => {
					getlocations.push(LocationModel.fromJson(getlocation));
				});
				//console.log(getvehicles);
				return getlocations;

			}).catch(this.handleError);
	};

	save_LocationUser (user_location: USER_LOCATION_ENTRY): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl_user_location, user_location.toJson(true),options)
				.map((response) => {
					console.log(response);
					return response;
				});
		
	}
}
