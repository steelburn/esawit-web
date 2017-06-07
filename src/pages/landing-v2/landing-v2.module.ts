import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingV2Page } from './landing-v2';

@NgModule({
  declarations: [
    LandingV2Page,
  ],
  imports: [
    IonicPageModule.forChild(LandingV2Page),
  ],
  exports: [
    LandingV2Page
  ]
})
export class LandingV2PageModule {}
