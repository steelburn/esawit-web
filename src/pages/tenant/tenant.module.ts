import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantPage } from './tenant';

@NgModule({
  declarations: [
    TenantPage,
  ],
  imports: [
    IonicPageModule.forChild(TenantPage),
  ],
  exports: [
    TenantPage
  ]
})
export class TenantPageModule {}
