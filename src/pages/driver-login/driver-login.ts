import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { CustomerDriverRegistrationPage } from '../customer-driver-registration/customer-driver-registration';
import { DriverHomePage } from '../driver-home/driver-home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the DriverLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-driver-login',
  templateUrl: 'driver-login.html',
})



export class DriverLoginPage {

user = {} as User;

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  }



  async login(user: User)
{
  this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
  .then(user => {
    firebase.database().ref('User/' + user.uid).once('value', snapshot =>{
      if(snapshot.val().type == 'driver'){
        this.navCtrl.setRoot(DriverHomePage);
      } else {
        this.navCtrl.setRoot(DriverLoginPage);
      }
    })
  }, err =>{'sorry'})
}

register() {
      this.navCtrl.push(CustomerDriverRegistrationPage);
    }



  ionViewDidLoad() {

    console.log('ionViewDidLoad DriverLoginPage');
  }

}
