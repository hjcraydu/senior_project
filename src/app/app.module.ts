import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FCM } from '@ionic-native/fcm';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerDriverRegistrationPage } from '../pages/customer-driver-registration/customer-driver-registration';
import { CustomerLoginPage } from '../pages/customer-login/customer-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { CustomerHomePage } from '../pages/customer-home/customer-home';
import { DriverHomePage } from '../pages/driver-home/driver-home';
import { ChatPage } from '../pages/chat/chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Firebase } from '@ionic-native/firebase'
import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerDriverRegistrationPage,
    CustomerLoginPage,
    DriverLoginPage,
    DriverHomePage,
    CustomerHomePage,
    ChatPage
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    CustomerHomePage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    FCM,
    AuthService
  ]
})
export class AppModule {}
