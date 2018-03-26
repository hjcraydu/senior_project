import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerRegistrationPage } from './customer-registration';


@NgModule({
  declarations: [
    CustomerRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerRegistrationPage),
  ],
})
export class CustomerRegistrationPageModule {}
