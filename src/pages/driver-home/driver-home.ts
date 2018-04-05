import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { DriverHomePage } from '../driver-home/driver-home';
import { CustomerModalPage } from '../customer-modal/customer-modal';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

/**
 * Generated class for the DriverHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver-home',
  templateUrl: 'driver-home.html'
})
export class DriverHomePage {

users = [];

/*  const custRef = firebase.database().ref().child('User').orderByChild('type').equalTo('customer').on('value', function(snapshot) {
    snapshot.forEach(function(child) {
      var data = child.val();
      console.log(data.firstName + ' ' + data.lastName + ' ' + data.location  );
    });
  }, function(error) {
    // The Promise was rejected.
    console.log('Error: ',error);
});*/

  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    firebase.database().ref().child(`User`).orderByChild('type').equalTo('customer').once( "value", ( snapshot )=>{
              let result = snapshot.val(); //snapshot.val() gives key value pairs
              //you can make object array to show data on html using *ngFor
              for(let k in result){
                  this.users.push({
                     id : k, //gives key of each object
                     value : result[k] //gives user values
                  })
              }
           });
  }

  openModal(object){
  let modalPage = this.modalCtrl.create('CustomerModalPage',object);
  modalPage.onDidDismiss(data => {
  });
  modalPage.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverHomePage');
  }

}
