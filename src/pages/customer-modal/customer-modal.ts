import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
/**
 * Generated class for the CustomerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-modal',
  templateUrl: 'customer-modal.html',
})
export class CustomerModalPage {





  constructor(private fb: AngularFire, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    let user_first_name = navParams.get("firstname"); //edited
    let location= navParams.get("location"); //edited
  }

  acceptRequest(){

  }


  closeModal() {
    this.viewCtrl.dismiss();
  }
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerModalPage');
  }*/
  ionViewWillLoad(){
    //const data = this.navParams.get('data');
    console.log();
  }



}
