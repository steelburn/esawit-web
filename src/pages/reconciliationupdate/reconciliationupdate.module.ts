import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReconciliationupdatePage } from './reconciliationupdate';

@NgModule({
  declarations: [
    ReconciliationupdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ReconciliationupdatePage),
  ],
  exports: [
    ReconciliationupdatePage
  ]
})
export class ReconciliationupdatePageModule {}
