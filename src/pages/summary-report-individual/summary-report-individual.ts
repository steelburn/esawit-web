import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//import{SummaryReportPage}from '../summary-report/summary-report';


/**
 * Generated class for the SummaryReportIndividualPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-summary-report-individual',
  templateUrl: 'summary-report-individual.html',
})
export class SummaryReportIndividualPage {
  posts1:any;items: any; location_param:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.location_param = navParams.get('location_param');
    console.log(navParams.get('location_param'));

   this.http.get('http://api.zen.com.my/api/v2/esawitdb/_table/summary_report_individual?filter=location_id=' + this.location_param + '&api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4').map(res => res.json()).subscribe(data => {
        this.posts1 = data.resource; 
         });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportIndividualPage');
  }

}
