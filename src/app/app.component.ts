import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LandingV1Page } from '../pages/landing-v1/landing-v1';
import { LandingV2Page } from '../pages/landing-v2/landing-v2';
import { DriverPage } from '../pages/driver/driver';
import { DriverInfoPage } from '../pages/driver-info/driver-info';
import { LocationPage } from '../pages/location/location';
import { LocationInfoPage } from '../pages/location-info/location-info';
import { ModulePage } from '../pages/module/module';
import { RolePage } from '../pages/role/role';
import { SectorPage } from '../pages/sector/sector';
import { TenantPage } from '../pages/tenant/tenant';
import { UserPage } from '../pages/user/user';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { TabsPage } from '../pages/tabs/tabs';

import { ReportsPage } from '../pages/reports/reports';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public processPageClicked: boolean = false; //Whatever you want to initialise it as
  public reportingPageClicked: boolean = false; //Whatever you want to initialise it as
  public othersPageClicked: boolean = false; //Whatever you want to initialise it as

  public processPageClick() { this.processPageClicked = !this.processPageClicked; }
  public reportingPageClick() { this.reportingPageClicked = !this.reportingPageClicked; }
  public othersPageClick() { this.othersPageClicked = !this.othersPageClicked; }

  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any}>;
  reportingPages: Array<{title: string, component: any}>;
  processPages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen)
   {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage},
      { title: 'Landing V1', component: LandingV1Page},
      { title: 'Component Demo', component: LandingV2Page},
      { title: 'Tabs', component: TabsPage}
    ];

    this.reportingPages = [
      {title: 'Report', component: ReportsPage}
    ];

    this.processPages = [
      { title: 'Driver', component: DriverPage },
      { title: 'Location', component: LocationPage },
      { title: 'Module', component: ModulePage },
      { title: 'Role', component: RolePage },
      { title: 'Sector', component: SectorPage },
      { title: 'Tenant', component: TenantPage },
      { title: 'User', component: UserPage },
      { title: 'Vehicle', component: VehiclePage }
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.
  }
}
