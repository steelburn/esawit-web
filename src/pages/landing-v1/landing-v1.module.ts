import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingV1Page } from './landing-v1';

@NgModule({
  declarations: [
    LandingV1Page,
  ],
  imports: [
    IonicPageModule.forChild(LandingV1Page),
  ],
  exports: [
    LandingV1Page
  ]
})
export class LandingV1PageModule {}
