import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { LandingV1Page } from '../pages/landing-v1/landing-v1';
import { LandingV2Page } from '../pages/landing-v2/landing-v2';
import { LandingV3Page } from '../pages/landing-v3/landing-v3';
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
import { LoginPage } from '../pages/login/login';

import { ReportsPage } from '../pages/reports/reports';
import { VehicleTransactionPage } from '../pages/vehicle-transaction/vehicle-transaction';
import { ReconciliationPage } from '../pages/reconciliation/reconciliation';
import { ReconciliationupdatePage } from '../pages/reconciliationupdate/reconciliationupdate';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public headerButtonClicked: boolean = true; //Whatever you want to initialise it as
  public processPageClicked: boolean = false; //Whatever you want to initialise it as
  public reportingPageClicked: boolean = false; //Whatever you want to initialise it as
  public othersPageClicked: boolean = false; //Whatever you want to initialise it as

  public headerButtonClick() {
    this.headerButtonClicked = !this.headerButtonClicked;
  }
  public processPageClick() {
    this.processPageClicked = !this.processPageClicked;
  }
  public reportingPageClick() {
    this.reportingPageClicked = !this.reportingPageClicked;
  }
  public othersPageClick() {
    this.othersPageClicked = !this.othersPageClicked;
  }

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LandingV1Page;
  activePage: any;

  pages: Array<{ title: string, component: any }>;
  reportingPages: Array<{ title: string, component: any }>;
  processPages: Array<{ title: string, component: any, pid: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public translate: TranslateService, public translateService: TranslateService) {
    this.initializeApp();
    this.initializeLang();
    this.translateToMalay();
    this.translateToEnglish();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      { title: 'Landing V1', component: LandingV1Page },
      { title: 'Landing V3', component: LandingV3Page },
      { title: 'Component Demo', component: LandingV2Page },
      { title: 'Tabs', component: TabsPage }
    ];

    this.reportingPages = [
      { title: 'Report', component: ReportsPage },
      { title: 'Vehicle Transaction', component: VehicleTransactionPage },
      {title: 'Reconciliation', component: ReconciliationPage}
    ];

    this.processPages = [
      { title: 'Driver', component: TabsPage, pid: 0 },
      { title: 'Location', component: TabsPage, pid: 1 },
      { title: 'User', component: TabsPage, pid: 2 },
      { title: 'Vehicle', component: TabsPage, pid: 3 }
      // { title: 'Module', component: ModulePage },
      // { title: 'Role', component: RolePage },
      // { title: 'Sector', component: SectorPage },
      // { title: 'Tenant', component: TenantPage }
    ];

    this.activePage = this.pages[1];


  }

  initializeLang() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
    this.nav.push(page.component, {
      pid: page.pid
    });
    this.activePage = page;
  }

  checkActivePage(page) {
    return page == this.activePage;
  }


  //---------------------header button start---------------------//
  public translateToEnglishClicked: boolean = true; //Whatever you want to initialise it as
  public translateToMalayClicked: boolean =false; //Whatever you want to initialise it as

  public translateToEnglish() {
    this.translateService.use('en');
    this.translateToMalayClicked = !this.translateToMalayClicked;
    this.translateToEnglishClicked = !this.translateToEnglishClicked;
    console.log("bm : " + this.translateToMalayClicked);
    console.log("en : " + this.translateToEnglishClicked);
  }

  public translateToMalay() {
    this.translateService.use('bm');
    this.translateToEnglishClicked = !this.translateToEnglishClicked;
    this.translateToMalayClicked = !this.translateToMalayClicked;
    console.log("bm : " + this.translateToMalayClicked);
    console.log("en : " + this.translateToEnglishClicked);
  }
  //---------------------header button end---------------------//

}
