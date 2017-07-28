import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HeaderPage } from '../pages/header/header';
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
import { ImeiPage } from '../pages/imei/imei';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReportsPage } from '../pages/reports/reports';
import { VehicleTransactionPage } from '../pages/vehicle-transaction/vehicle-transaction';
import { ReconciliationPage } from '../pages/reconciliation/reconciliation';
import { ReconciliationupdatePage } from '../pages/reconciliationupdate/reconciliationupdate';


//import { NgModule }      from '@angular/core';
//import { FormsModule }   from '@angular/forms';
import { FilterData } from '../shared/filter';
import { FilterVehicle } from '../shared/vehiclefilter';
import { FilterLocation } from '../shared/locationfilter';
import { FilterUser } from '../shared/userfilter';
import { FilterDriver } from '../shared/driverfilter';




//import { UniquePipe } from '../shared/unique';

import { LocationTransactionPage } from '../pages/location-transaction/location-transaction';
import { HarvestlistPage } from '../pages/harvestlist/harvestlist';
import { MandorlistPage } from '../pages/mandorlist/mandorlist';
import { FactorylistPage } from '../pages/factorylist/factorylist';

import { SummaryReportPage } from '../pages/summary-report/summary-report';
import { SummaryReportIndividualPage } from '../pages/summary-report-individual/summary-report-individual';


@NgModule({
  declarations: [
    MyApp,
    HeaderPage,
    HomePage,
    LandingV1Page,
    LandingV2Page,
    FilterData, 
    FilterVehicle, 
    FilterLocation, 
    FilterUser, 
    FilterDriver,
    LandingV3Page,
    DriverPage,
    DriverInfoPage,
    LocationPage,
    LocationInfoPage,
    ModulePage,
    RolePage,
    SectorPage,
    TenantPage,
    UserPage,
    VehiclePage,
    TabsPage,
    ReportsPage,
    VehicleTransactionPage,
    ReconciliationPage,
    ReconciliationupdatePage,
    LocationTransactionPage,
    HarvestlistPage,
    MandorlistPage,
    FactorylistPage,
    LoginPage,
    SummaryReportPage,
    SummaryReportIndividualPage,
    ImeiPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HeaderPage,
    HomePage,
    LandingV1Page,
    LandingV2Page,
    LandingV3Page,
    DriverPage,
    DriverInfoPage,
    LocationPage,
    LocationInfoPage,
    ModulePage,
    RolePage,
    SectorPage,
    TenantPage,
    UserPage,
    VehiclePage,
    TabsPage,
    ReportsPage,
    VehicleTransactionPage, 
    ReconciliationPage, 
    ReconciliationupdatePage,
    LocationTransactionPage,
    HarvestlistPage,
    MandorlistPage,
    FactorylistPage,
    LoginPage,
    SummaryReportPage,
    SummaryReportIndividualPage,
    ImeiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}
