import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryReportPage } from './summary-report';

@NgModule({
  declarations: [
    SummaryReportPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryReportPage),
  ],
  exports: [
    SummaryReportPage
  ]
})
export class SummaryReportPageModule {}
