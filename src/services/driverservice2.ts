import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

import {Driver} from '../models/driver';
import {GETVEHICLE} from '../models/driver';
import {GETVEHICLE2} from '../models/driver';
import {GETDRIVER_CHART} from '../models/driver';



import {VEHICLEDRIVER_MODEL} from '../models/vehicle';

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
    baseResourceUrl_Vehicle: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_vehicle';

    baseResourceUrl_VehicleDriver: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/vehicle_driver';

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
	
	GetDriver_Chart (params?:URLSearchParams): Observable<GETDRIVER_CHART[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResource_Url+'totaldriver_view', { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let drivercharts: Array<GETDRIVER_CHART> = [];
				result.resource.forEach((driverchart) => {
					drivercharts.push(GETDRIVER_CHART.fromJson(driverchart));
				});
				
				return drivercharts;
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
			.get(this.baseResource_Url+'getvehicles2_view', { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getvehicles: Array<GETVEHICLE> = [];
				result.resource.forEach((getvehicle) => {
					getvehicles.push(GETVEHICLE.fromJson(getvehicle));
				});
				return getvehicles;

			}).catch(this.handleError);
	};
	
	getVehicles2 (params?: URLSearchParams): Observable<GETVEHICLE2[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl_Vehicle, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getvehicles: Array<GETVEHICLE2> = [];
				result.resource.forEach((getvehicle) => {
					getvehicles.push(GETVEHICLE2.fromJson(getvehicle));
				});
				console.log(getvehicles);
				return getvehicles;

			}).catch(this.handleError);
	};
	


	getTotalReport (params?: URLSearchParams) 
	{
		console.log('getTotalReport');
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'totaldriver_view', { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				//console.log('Getting result');
				var result: any = response.json();	
				//console.log(result);			
				return result;

			});
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
				//console.log(result);
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

	/*	Driver Vehicel */
	save_DriverVehicle (vehicel_driver: VEHICLEDRIVER_MODEL): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl_VehicleDriver, vehicel_driver.toJson(true),options)
				.map((response) => {
					console.log(response);
					return response;
				});
		
	}

}
