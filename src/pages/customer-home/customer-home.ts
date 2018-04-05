import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user';
import { Request } from '../../models/request';
import * as firebase from 'firebase';
import moment from 'moment';
/**
 * Generated class for the CustomerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-home',
  templateUrl: 'customer-home.html',
})

export class CustomerHomePage {

  public currentDateTime = moment().format("MM/DD/YYYY h:mm:ss A")

  const request = {} as Request;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {

  }

createRequest(request: Request) {

  this.request.timeOfRequest = this.currentDateTime;

    this.afAuth.authState.take(1).subscribe(auth =>{
        console.log(firebase.auth().currentUser);
        this.request['userID'] = firebase.auth().currentUser.uid;
        firebase.database().ref(`Rides`).push(this.request);
        //this.afDatabase.object(`User/${auth.uid}/`).update(this.request)
      //    .then(() => this.navCtrl.setRoot(CustomerHomePage));
     })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerHomePage');
  }

}
