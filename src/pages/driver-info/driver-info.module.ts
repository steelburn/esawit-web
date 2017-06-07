import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverInfoPage } from './driver-info';

@NgModule({
  declarations: [
    DriverInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverInfoPage),
  ],
  exports: [
    DriverInfoPage
  ]
})
export class DriverInfoPageModule {}
