import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ReportService } from '../../services/reportservice';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import * as constants from '../../app/config/constants'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { ReconciliationReport } from '../../models/reconciliation';
import { ReconciliationupdatePage } from '../reconciliationupdate/reconciliationupdate'
import { LandingV1Page } from '../landing-v1/landing-v1'

/**
 * Generated class for the ReconciliationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reconciliation',
  templateUrl: 'reconciliation.html', providers: [ReportService, BaseHttpService]
})
export class ReconciliationPage {

  items: any;
  //items = [];
  public item_ReconciliationReports: ReconciliationReport[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private reportservice: ReportService,
    private httpService: BaseHttpService, public modalCtrl: ModalController) {
    this.get_ReconciliationReport();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReconciliationPage');
  }

  get_ReconciliationReport() {
    let self = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self.reportservice.Reconsilation_Tranactionquery(params)
      .subscribe((item_ReconciliationReports: ReconciliationReport[]) => {
        self.item_ReconciliationReports = item_ReconciliationReports
        console.log(self.item_ReconciliationReports);
      });
  }

  UpdateInfo(data) 
  {
    var ID = data.ID;
    if (ID != null) {
      //console.log(ID);
      //alert(ID);
      let addModal = this.modalCtrl.create(ReconciliationupdatePage, { ID: data.ID });
      addModal.onDidDismiss(item => {
        if (item) {
          this.items.add(item);
        }
      })
      addModal.present();
    }
  }

  Viewlanding(){
    
  }

}
