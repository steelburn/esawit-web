import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationTransactionPage } from './location-transaction';

@NgModule({
  declarations: [
    LocationTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationTransactionPage),
  ],
  exports: [
    LocationTransactionPage
  ]
})
export class LocationTransactionPageModule {}
