import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

// import { Http } from '@angular/http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import{SummaryReportIndividualPage}from '../summary-report-individual/summary-report-individual';

/**
 * Generated class for the SummaryReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-summary-report',
  templateUrl: 'summary-report.html',
})
export class SummaryReportPage {

  posts: any; posts1:any;items: any;
  shownGroup = null;
  searchLocationString: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {    
   let self = this;
    let params: URLSearchParams = new URLSearchParams();
   
   
    this.http.get('http://api.zen.com.my/api/v2/esawitdb/_table/summary_report?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4').map(res => res.json()).subscribe(data => {      
            this.posts = data.resource;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }
  toggleGroup(group) {    
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {                
        // this.http.get('http://api.zen.com.my/api/v2/esawitdb/_table/summary_report_individual?filter=location_GUID=' + group + '&api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4').map(res => res.json()).subscribe(data => {
        // this.posts1 = data.resource; 
        //  });

        //  this.shownGroup = group;

        // this.navCtrl.push(SummaryReportIndividualPage, {
        //     location_param: group
        // });
        let addModal = this.modalCtrl.create(SummaryReportIndividualPage, {location_param: group});
        addModal.onDidDismiss(item => {
          if (item) {
            this.items.add(item);
          }
        })
        addModal.present();
    }
};
isGroupShown(group) {    
    return this.shownGroup === group; 
};

searchLocation(searchLocationString1) {
    if (searchLocationString1 != '') 
    {      
      return this.posts.filter((post) => 
      {
          return post.Location.toLowerCase().indexOf(searchLocationString1.toLowerCase()) > -1;
      });
    }
    else {
      this.http.get('http://api.zen.com.my/api/v2/esawitdb/_table/summary_report?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4').map(res => res.json()).subscribe(data => {      
            this.posts = data.resource;
        });
    }
}
}
