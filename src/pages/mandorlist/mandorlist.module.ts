import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MandorlistPage } from './mandorlist';

@NgModule({
  declarations: [
    MandorlistPage,
  ],
  imports: [
    IonicPageModule.forChild(MandorlistPage),
  ],
  exports: [
    MandorlistPage
  ]
})
export class MandorlistPageModule {}
