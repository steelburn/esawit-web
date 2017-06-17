import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HarvestlistPage } from './harvestlist';

@NgModule({
  declarations: [
    HarvestlistPage,
  ],
  imports: [
    IonicPageModule.forChild(HarvestlistPage),
  ],
  exports: [
    HarvestlistPage
  ]
})
export class HarvestlistPageModule {}
