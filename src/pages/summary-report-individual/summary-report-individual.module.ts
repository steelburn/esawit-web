import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryReportIndividualPage } from './summary-report-individual';

@NgModule({
  declarations: [
    SummaryReportIndividualPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryReportIndividualPage),
  ],
  exports: [
    SummaryReportIndividualPage
  ]
})
export class SummaryReportIndividualPageModule {}
