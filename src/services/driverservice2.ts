import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

import {Driver} from '../models/driver';
import {GETVEHICLE} from '../models/driver';


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
export class DriverService 
{
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_driver';
	baseResource_Url: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/';
	constructor(private httpService: BaseHttpService, private nav: NavController) {};


	
    private handleError (error: any) {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}
	
	query (params?:URLSearchParams): Observable<Driver[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let drivers: Array<Driver> = [];
				result.resource.forEach((driver) => {
					drivers.push(Driver.fromJson(driver));
				});
				return drivers;
			}).catch(this.handleError);
	};
	
	get (id: string, params?: URLSearchParams): Observable<Driver> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl + '/' + id, { search: params ,headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let driver: Driver = Driver.fromJson(result);
				return driver;
			}).catch(this.handleError);
	};
	
	getVehicles (params?: URLSearchParams): Observable<GETVEHICLE[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getvehicles_view', { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getVehicles: Array<GETVEHICLE> = [];
				result.resource.forEach((getVehicle) => {
					getVehicles.push(GETVEHICLE.fromJson(getVehicle));
				});
				console.log(getVehicles);
				return getVehicles;

			}).catch(this.handleError);
	};
	
	getVehicles_byDriver (id:string,params?: URLSearchParams): Observable<GETVEHICLE[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getvehiclesbydriver_view?filter=driver_GUID='+id, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				console.log(result);
				let get_selectvehicles: Array<GETVEHICLE> = [];
				result.resource.forEach((get_selectvehicle) => {
					get_selectvehicles.push(GETVEHICLE.fromJson(get_selectvehicle));
				});
				//console.log(getVehicles);
				return get_selectvehicles;

			}).catch(this.handleError);
	};

	save (master_driver: Driver): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl, master_driver.toJson(true),options)
				.map((response) => {
					return response;
				});
		
	}

	Update (driver: Driver) 
	{
		// console.log(localStorage.getItem('session_token'));
		// console.log(driver.toJson(true));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		// if (driver.driver_GUID) 
		// {
			return this.httpService.http.patch(this.baseResourceUrl , driver.toJson(true),options)
			.map((data) => {
				return data;
			});
		// } 
	}

	remove (id: string) {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.delete(this.baseResourceUrl + '/' + id,{ headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				//console.log(result.driver_GUID);
				return result.driver_GUID;
			});
	}

}
