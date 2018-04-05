import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CustomerDriverRegistrationPage } from '../pages/customer-driver-registration/customer-driver-registration';
import { CustomerLoginPage } from '../pages/customer-login/customer-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { CustomerHomePage } from '../pages/customer-home/customer-home';
import { DriverHomePage } from '../pages/driver-home/driver-home';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //Eventually change back to HomePage!!!
  rootPage: any = CustomerLoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'CustomerDriver Registration', component: CustomerDriverRegistrationPage },
      { title: 'Customer Login', component: CustomerLoginPage },
      { title: 'Driver Login', component: DriverLoginPage },
      { title: 'Driver Home', component: DriverHomePage },
      { title: 'Customer Home', component: CustomerHomePage }
    ];

  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
