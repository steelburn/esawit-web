import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController  } from 'ionic-angular';
import { ReportService } from '../../services/reportservice';

import {BaseHttpService} from '../../services/base-http';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';
import {Harvestreport} from '../../models/harvestreport';
import {Mandorreport} from '../../models/mandorreport';
import {Factoryreport} from '../../models/factoryreport';
import * as constants from '../../app/config/constants'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

class ServerResponse {
	constructor(public resource: any) {
	}
};

/**
 * Generated class for the ReportsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reports-list',
  templateUrl: 'reports.html',providers: [ReportService,BaseHttpService]
})
export class ReportsPage {
  public harvestreports: Harvestreport[] = [];   
  searchTerm: string = ''; searchControl: FormControl;items: any;

  public mandorreports: Mandorreport[] = [];   
  public factoryreports: Factoryreport[] = [];   

baseResourceUrl: string = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/esawitdb/_table/HarvestReport?api_key='+constants.DREAMFACTORY_API_KEY;
  constructor(private reportservice: ReportService,private httpService: BaseHttpService,public navCtrl: NavController, 
  public navParams: NavParams,public loadingCtrl: LoadingController) 
  {
    this.searchControl = new FormControl();
    this.GenerateToken() ;
    var token = localStorage.getItem('session_token');
    
    if (token =='') 
    {console.log('Login Plz');}

    else
    {console.log(token);}

    this.getList();  this.getMandorList();this.getFactoryList();
    this.presentLoading();
  }

presentLoading() 
{
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    //this.GetHarvestReport();
}

private storeToken(data){localStorage.setItem('session_token', data.session_token);}

private GenerateToken() 
{ 
  var queryHeaders = new Headers();
  queryHeaders.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: queryHeaders });
  this.httpService.http.post('http://api.zen.com.my/api/v2/user/session', '{"email":"sampath415@gmail.com","password":"sampath415"}',options)
  .subscribe((data) => {this.storeToken(data.json());}, (error) => {console.log('error', JSON.parse(error._body).error.message);
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

getList() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.reportservice.query(params)
            .subscribe((harvestreports: Harvestreport[]) => {
                self.harvestreports = harvestreports
                console.log(self.harvestreports);
            });
    }

getMandorList() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.reportservice.Mandoryquery(params)
            .subscribe((mandorreports: Mandorreport[]) => {
                self.mandorreports = mandorreports
                console.log(self.mandorreports);
            });
    }

getFactoryList() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.reportservice.Factoryquery(params)
            .subscribe((factoryreports: Factoryreport[]) => {
                self.factoryreports = factoryreports
                console.log(self.factoryreports);
            });
    }

setFilteredItems() 
{
 
        this.harvestreports = this.filterItems(this.searchTerm);
 
}

filterItems(searchTerm)
{
   if(searchTerm!='')
   {
        return this.harvestreports.filter((harvestreport) => 
        {
            return harvestreport.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
   } 
   else
   {
     this.GetHarvestReport();
   }
}

GetHarvestReport(): Observable<Harvestreport>
{
  console.log('Trying to Get Report.');
  var queryHeaders = new Headers();
	queryHeaders.append('Content-Type', 'application/json');
  console.log(localStorage.getItem('session_token'));
  queryHeaders.append('X-Dreamfactory-Session-Token', localStorage.getItem('session_token'));
  queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
  console.log(this.baseResourceUrl);
	return this.httpService.http.get(this.baseResourceUrl, { headers: queryHeaders}).map((response) => 
      {
        console.log('Response');
				var result: ServerResponse = response.json();
        console.log(result);
				let group: Harvestreport = Harvestreport.fromJson(result);
				return group;
			}).catch(this.handleError);
};

  ionViewDidLoad() {
 
       
 
 
    }

}
