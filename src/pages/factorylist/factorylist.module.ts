import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FactorylistPage } from './factorylist';

@NgModule({
  declarations: [
    FactorylistPage,
  ],
  imports: [
    IonicPageModule.forChild(FactorylistPage),
  ],
  exports: [
    FactorylistPage
  ]
})
export class FactorylistPageModule {}
