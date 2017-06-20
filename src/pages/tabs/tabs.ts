import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DriverPage } from '../driver/driver';
import { LocationPage } from '../location/location';
import { ModulePage } from '../module/module';
import { RolePage } from '../role/role';
import { SectorPage } from '../sector/sector';
import { TenantPage } from '../tenant/tenant';
import { UserPage } from '../user/user';
import { VehiclePage } from '../vehicle/vehicle';
/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  //tabs
  tab1Root = DriverPage;
  tab2Root = LocationPage;
  tab3Root = ModulePage;
  tab4Root = RolePage;
  tab5Root = SectorPage;
  tab6Root = TenantPage;
  tab7Root = UserPage;
  tab8Root = VehiclePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}


