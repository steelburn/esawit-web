import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleTransactionPage } from './vehicle-transaction';

@NgModule({
  declarations: [
    VehicleTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleTransactionPage),
  ],
  exports: [
    VehicleTransactionPage
  ]
})
export class VehicleTransactionPageModule {}
