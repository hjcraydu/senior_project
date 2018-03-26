import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerRegistrationPage } from '../pages/customer-registration/customer-registration';
import { CustomerLoginPage } from '../pages/customer-login/customer-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { CustomerHomePage } from '../pages/customer-home/customer-home';
import { DriverHomePage } from '../pages/driver-home/driver-home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';





export const firebaseConfig = {
  apiKey: 'AIzaSyAkoMka7yjL7R4zCeiZtVbUdU5cXavaSBY',
  authDomain: 'senior-project-f7553.firebaseapp.com',
  databaseURL: 'https://senior-project-f7553.firebaseio.com',
  storageBucket: 'senior-project-f7553',
  messagingSenderId: '782008930652'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerRegistrationPage,
    CustomerLoginPage,
    DriverLoginPage,
    DriverHomePage,
    CustomerHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerRegistrationPage,
    CustomerLoginPage,
    DriverLoginPage,
    DriverHomePage,
    CustomerHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
