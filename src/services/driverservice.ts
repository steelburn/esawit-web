import {Injectable} from'@angular/core';
import {Http, Headers, URLSearchParams,RequestOptions} from '@angular/http';
import * as constants from '../app/config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Driver} from '../models/driver';
import { NavController } from 'ionic-angular';

class ServerObj {
	constructor (public resource: any) {
	}
};

@Injectable()
export class DriverService 
{
	baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/eSawitdb/_table/master_driver';
	constructor(private httpService: BaseHttpService,private nav: NavController) 
    {

	};


	
	private handleError (error: any) 
    {
	   let errMsg = (error.message) ? error.message :
	   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	   console.log(errMsg); // log to console instead
	   localStorage.setItem('session_token', '');       
	  return Observable.throw(errMsg);
	}
	
	
	save (driver: Driver):Observable<any>
    {

        alert(driver);
		var queryHeaders = new Headers();
    	queryHeaders.append('Content-Type', 'application/json');
    	queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
    	queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
    	
    	let options = new RequestOptions({ headers: queryHeaders });

		
		return this.httpService.http.post(this.baseResourceUrl, 
                                            driver.toJson(true),options).map((data) => {return data;});
	}
}

