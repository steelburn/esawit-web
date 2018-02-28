import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';
import { NavController } from 'ionic-angular';
import {Get_IMEI} from '../models/imei';
import {User} from '../models/user';
import {UserIMEI} from '../models/user';
import {UserIMEI_HISTORY} from '../models/user';


import * as constants from '../app/config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';



class ServerResponse {
	constructor(public resource: any) {
	}
};

@Injectable()
export class ImeiService 
{
	baseViewUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/view_user_imei';
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/user_imei';
	baseResourceUrl_masteruser: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_user';
    baseResourceUrl_ImeiHistory: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/users_imei_history';

    baseResource_Url:string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/';
    

	constructor(private httpService: BaseHttpService, private nav: NavController) {};


	
    private handleError (error: any) 
    {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   //localStorage.setItem('session_token', '');       
	   return Observable.throw(errMsg);
	}
	
	
	getImei (params?: URLSearchParams): Observable<UserIMEI[]> 
	{
        //console.log(localStorage.getItem('session_token'));console.log(constants.DREAMFACTORY_API_KEY);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getimei_users_view', { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getImeis: Array<UserIMEI> = [];
				result.resource.forEach((getImei) => {
					getImeis.push(UserIMEI.fromJson(getImei));
				});
                //console.log(getImeis);
				return getImeis.filter(getImei => getImei.user_IMEI != '');

			}).catch(this.handleError);
	};
	
	getImei2 (params?: URLSearchParams): Observable<UserIMEI[]> 
	{
        //console.log(localStorage.getItem('session_token'));console.log(constants.DREAMFACTORY_API_KEY);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getImeis: Array<UserIMEI> = [];
				result.resource.forEach((getImei) => {
					getImeis.push(UserIMEI.fromJson(getImei));
				});
                console.log(getImeis);
				return getImeis.filter(getImei => getImei.user_IMEI != '');

			}).catch(this.handleError);
	};

	getImeiUsingView (params?: URLSearchParams): Observable<UserIMEI[]> 
	{
        //console.log(localStorage.getItem('session_token'));console.log(constants.DREAMFACTORY_API_KEY);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseViewUrl, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let getImeis: Array<UserIMEI> = [];
				result.resource.forEach((getImei) => {
					getImeis.push(UserIMEI.fromJson(getImei));
				});
                console.log(getImeis);
				return getImeis.filter(getImei => getImei.user_IMEI != '');

			}).catch(this.handleError);
	};


    Get_IMEI_History (Imei_id:string,params?: URLSearchParams): Observable<Get_IMEI[]> 
	{
		//console.log(this.baseResource_Url+'getimei_history_view?filter=user_IMEI='+Imei_id);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
		
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResource_Url+'getimei_history_view2?filter=user_IMEI='+Imei_id, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				//console.log(result);
				let get_imei_histories: Array<Get_IMEI> = [];
				result.resource.forEach((get_imei_history) => {
					get_imei_histories.push(Get_IMEI.fromJson(get_imei_history));
				});
				console.log(get_imei_histories);
				return get_imei_histories;

			}).catch(this.handleError);
	};
	
	Get_IMEI_History2 (Imei_id:string,params?: URLSearchParams): Observable<Get_IMEI[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl +'?filter=user_IMEI='+Imei_id, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let get_imei_histories: Array<Get_IMEI> = [];
				result.resource.forEach((get_imei_history) => {
					get_imei_histories.push(Get_IMEI.fromJson(get_imei_history));
				});
				console.log(result);
				return get_imei_histories;

			}).catch(this.handleError);
	};

	Get_IMEI_History3 (Imei_id:string,params?: URLSearchParams): Observable<UserIMEI_HISTORY[]> 
	{
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
		return this.httpService.http
			.get(this.baseResourceUrl_ImeiHistory +'?filter=user_IMEI='+Imei_id, { search: params ,headers: queryHeaders})
			.map((response) => 
			{
				var result: any = response.json();
				let get_imeibyid_histories: Array<UserIMEI_HISTORY> = [];
				result.resource.forEach((get_imeibyid_historie) => {
					get_imeibyid_histories.push(UserIMEI_HISTORY.fromJson(get_imeibyid_historie));
				});
				//console.log(result);
				return get_imeibyid_histories;

			}).catch(this.handleError);
	};

Deactive_Imei (Imeimodal: Get_IMEI) 
	{
		//console.log(Imeimodal);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		if (Imeimodal.Imei_GUID) 
		{
			return this.httpService.http.patch(this.baseResourceUrl, Imeimodal.toJson(true),options)
			.map((data) => {
				return data;
			});
		} 
	}

	save_ImeiHistory (user_ImeiHistory: UserIMEI_HISTORY): Observable<any> 
	{
		//console.log(localStorage.getItem('session_token'));
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	let options = new RequestOptions({ headers: queryHeaders });
		
			return this.httpService.http.post(this.baseResourceUrl_ImeiHistory, user_ImeiHistory.toJson(true),options)
				.map((response) => {
					console.log(response);
					return response;
				});
		
	}
	
	getall_users (params?:URLSearchParams): Observable<User[]> {
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);    	
		return this.httpService.http
			.get(this.baseResourceUrl_masteruser, { search: params, headers: queryHeaders})
			.map((response) => {
				var result: any = response.json();
				let users: Array<User> = [];
				result.resource.forEach((user) => {
					users.push(User.fromJson(user));
				});
				return users;
			}).catch(this.handleError);
	};

	
AssginUser_Imei (Imeimodal: Get_IMEI) 
	{
		//console.log(Imeimodal);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		if (Imeimodal.Imei_GUID) 
		{
			return this.httpService.http.patch(this.baseResourceUrl, Imeimodal.toJson(true),options)
			.map((data) => {
				return data;
			});
		} 
	}
	

	

	
	
	

}
