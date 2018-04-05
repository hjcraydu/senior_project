import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDriverRegistrationPage } from './customer-driver-registration';


@NgModule({
  declarations: [
    CustomerDriverRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDriverRegistrationPage),
  ],
})
export class CustomerDriverRegistrationPageModule {}
