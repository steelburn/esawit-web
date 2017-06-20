import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ReportService } from '../../services/reportservice';
import {BaseHttpService} from '../../services/base-http';
import {Harvestreport} from '../../models/harvestreport';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

/**
 * Generated class for the HarvestlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-harvestlist',
  templateUrl: 'harvestlist.html',providers: [ReportService,BaseHttpService]
})
export class HarvestlistPage {

  public harvestreports: Harvestreport[] = [];   
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private reportservice: ReportService,private httpService: BaseHttpService) {
    this.getList();  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarvestlistPage');
  }


  
getList() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.reportservice.query(params)
            .subscribe((harvestreports: Harvestreport[]) => 
            {
                self.harvestreports = harvestreports
                //console.log(self.harvestreports);
            });
    }
}
