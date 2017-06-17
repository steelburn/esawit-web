import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReportService } from '../../services/reportservice';
import {BaseHttpService} from '../../services/base-http';
import {Mandorreport} from '../../models/mandorreport';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

/**
 * Generated class for the HarvestlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mandorlist',
  templateUrl: 'mandorlist.html',providers: [ReportService,BaseHttpService]
})
export class MandorlistPage {

  public mandorreports: Mandorreport[] = [];   
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private reportservice: ReportService,private httpService: BaseHttpService) 
  {
    this.getMandorList();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarvestlistPage');
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

}