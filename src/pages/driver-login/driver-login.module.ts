import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverLoginPage } from './driver-login';

@NgModule({
  declarations: [
    DriverLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverLoginPage),
  ],
})
export class DriverLoginPageModule {}
