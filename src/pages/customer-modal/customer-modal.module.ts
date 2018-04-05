import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerModalPage } from './customer-modal';

@NgModule({
  declarations: [
    CustomerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerModalPage),
  ],
})
export class CustomerModalPageModule {}
