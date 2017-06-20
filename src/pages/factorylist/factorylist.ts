import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ReportService } from '../../services/reportservice';
import {BaseHttpService} from '../../services/base-http';
import {Factoryreport} from '../../models/factoryreport';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

/**
 * Generated class for the HarvestlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-factorylist',
  templateUrl: 'factorylist.html',providers: [ReportService,BaseHttpService]
})
export class FactorylistPage {

  public factoryreports: Factoryreport[] = [];   
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private reportservice: ReportService,private httpService: BaseHttpService) {
this.getFactoryList();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarvestlistPage');
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
}