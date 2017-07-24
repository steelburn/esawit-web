import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingV3Page } from './landing-v3';

@NgModule({
  declarations: [
    LandingV3Page,
  ],
  imports: [
    IonicPageModule.forChild(LandingV3Page),
  ],
  exports: [
    LandingV3Page
  ]
})
export class LandingV3PageModule {}
