import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerDriverRegistrationPage } from '../pages/customer-driver-registration/customer-driver-registration';
import { CustomerLoginPage } from '../pages/customer-login/customer-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { CustomerHomePage } from '../pages/customer-home/customer-home';
import { DriverHomePage } from '../pages/driver-home/driver-home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerDriverRegistrationPage,
    CustomerLoginPage,
    DriverLoginPage,
    DriverHomePage,
    CustomerHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerDriverRegistrationPage,
    CustomerLoginPage,
    DriverLoginPage,
    DriverHomePage,
    CustomerHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
