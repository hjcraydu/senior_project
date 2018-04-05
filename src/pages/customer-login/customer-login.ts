import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CustomerDriverRegistrationPage } from '../customer-driver-registration/customer-driver-registration';
import { CustomerHomePage } from '../customer-home/customer-home';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the CustomerLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {

  user = {} as User;

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

  }


  async login(user:User)
{
  this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
  .then(user => {
    firebase.database().ref('User/' + user.uid).once('value', snapshot =>{
      if(snapshot.val().type == 'customer'){
        this.navCtrl.setRoot(CustomerHomePage);
      } else {
        this.navCtrl.setRoot(CustomerLoginPage);
      }
    })
  }, err =>{"sorry"})
}

register() {
      this.navCtrl.push(CustomerDriverRegistrationPage);
    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad CustomerLoginPage');
    }

  }
