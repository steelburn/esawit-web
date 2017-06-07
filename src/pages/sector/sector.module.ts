import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SectorPage } from './sector';

@NgModule({
  declarations: [
    SectorPage,
  ],
  imports: [
    IonicPageModule.forChild(SectorPage),
  ],
  exports: [
    SectorPage
  ]
})
export class SectorPageModule {}
