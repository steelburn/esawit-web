import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

import {LocationModel} from '../models/location';
import {GETLOCATION} from '../models/location';

import {VehicleModel} from '../models/vehicle';
import {GET_VEHICLE_LOCATION} from '../models/vehicle';
import {GETVEHICLE2} from '../models/driver';

import { LOCATION_VEHICLE_MODEL } from '../models/location';



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
export class VehicleService 
{
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_vehicle';
	baseResource_Url: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/';
	baseResourceUrl_masterlocation: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_location';
	baseResourceUrl_vehicle_location: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/vehicle_location';

	constructor(private httpService: BaseHttpService, private nav: NavController) {};


	
    private handleError (error: any) {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}
	
	save_vehicle (master_vehicle: VehicleModel): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });		
			return this.httpService.http.post(this.baseResourceUrl, master_vehicle.toJson(true),options)
				.map((response) => {
					return response;
				});
		
	}
	
	Update (vehicle: VehicleModel) 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		// if (driver.driver_GUID) 
		// {
			return this.httpService.http.patch(this.baseResourceUrl , vehicle.toJson(true),options)
			.map((data) => {
				return data;
			});
		// } 
	}

	get_vehicles (params?: URLSearchParams): Observable<VehicleModel[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let vehicles: Array<VehicleModel> = [];
				result.resource.forEach((vehicle) => {
					vehicles.push(VehicleModel.fromJson(vehicle));
				});
				//console.log(vehicles);
				return vehicles;

			}).catch(this.handleError);
	};
	
	get (id: string, params?: URLSearchParams): Observable<VehicleModel> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl + '/' + id, { search: params ,headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let vehicle: VehicleModel = VehicleModel.fromJson(result);
                //console.log(vehicle);
				return vehicle;
			}).catch(this.handleError);
	};
	
	
	getLocations_byvehicle (id:string,params?: URLSearchParams): Observable<GET_VEHICLE_LOCATION[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getlocationbyguid_view?filter=vehicle_GUID='+id, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				//console.log(result);
				let get_selectlocations: Array<GET_VEHICLE_LOCATION> = [];
				result.resource.forEach((get_selectlocation) => {
					get_selectlocations.push(GET_VEHICLE_LOCATION.fromJson(get_selectlocation));
				});
				//console.log(get_selectlocations);
				return get_selectlocations;

			}).catch(this.handleError);
	};
	
	getLocations (params?: URLSearchParams): Observable<GET_VEHICLE_LOCATION[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getalllocations_view', { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getlocations: Array<GET_VEHICLE_LOCATION> = [];
				result.resource.forEach((getlocation) => {
					getlocations.push(GET_VEHICLE_LOCATION.fromJson(getlocation));
				});
				//console.log(getvehicles);
				return getlocations;

			}).catch(this.handleError);
	};
	
	getLocations2 (params?: URLSearchParams): Observable<LocationModel[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl_masterlocation, { search: params ,headers: queryHeaders})
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

	getVehicles2 (params?: URLSearchParams): Observable<GETVEHICLE2[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getvehicles: Array<GETVEHICLE2> = [];
				result.resource.forEach((getvehicle) => {
					getvehicles.push(GETVEHICLE2.fromJson(getvehicle));
				});
				//console.log(getvehicles);
				return getvehicles;

			}).catch(this.handleError);
	};


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
				return result.vehicle_GUID;
			});
	}

    save_LocationVehicle (vehicel_location: LOCATION_VEHICLE_MODEL): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl_vehicle_location, vehicel_location.toJson(true),options)
				.map((response) => {
					console.log(response);
					return response;
				});
		
	}

	Deactive_Vehicle (vehiclemodel: VehicleModel) 
	{
		console.log(vehiclemodel);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		// if (vehiclemodel.vehicle_GUID) 
		// {
			return this.httpService.http.patch(this.baseResourceUrl, vehiclemodel.toJson(true),options)
			.map((data) => {
				return data;
			});
		//} 
	}

}
