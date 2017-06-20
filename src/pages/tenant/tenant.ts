import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TenantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tenant',
  templateUrl: 'tenant.html',
})
export class TenantPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {
    this.translateToMalay();
  }

  translateToMalay(){
    this.translateService.use('bm');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenantPage');
  }

}
