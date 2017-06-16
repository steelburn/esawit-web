import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReportService } from '../../services/reportservice';
import {BaseHttpService} from '../../services/base-http';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';
import * as constants from '../../app/config/constants'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import {VehicleTransactionReport} from '../../models/reportmodel';

/**
 * Generated class for the VehicleTransactionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
class ServerResponse {
	constructor(public resource: any) {
	}
};


@IonicPage()
@Component({
  selector: 'page-vehicle-transaction',
  templateUrl: 'vehicle-transaction.html',providers: [ReportService,BaseHttpService]
})



export class VehicleTransactionPage 
{
  
  items=[];
  public vehicle_transactionReports: VehicleTransactionReport[] = [];   

  constructor(public navCtrl: NavController, public navParams: NavParams,private reportservice: ReportService,
  private httpService: BaseHttpService) 
  {
    this.get_VehicleTransactionReport();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleTransactionPage');
  }

  


public print = (): void => {
    window.print();
  }
get_VehicleTransactionReport() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
         self.reportservice.VehicleTranactionquery(params)
            .subscribe((vehicle_transactionReports: VehicleTransactionReport[]) =>
             {
                self.vehicle_transactionReports = vehicle_transactionReports
                console.log(self.vehicle_transactionReports);
            });
    }
}
