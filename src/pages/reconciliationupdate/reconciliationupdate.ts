import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReconciliationupdatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reconciliationupdate',
  templateUrl: 'reconciliationupdate.html',
})
export class ReconciliationupdatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    console.log(navParams.get('deviceNum'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReconciliationupdatePage');
  }

}
