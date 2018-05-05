import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, AlertController, ToastController } from 'ionic-angular';
import { CustomerModalPage } from '../customer-modal/customer-modal';
import firebase from 'firebase';
import { ChatPage } from '../chat/chat';
import { DriverLoginPage } from '../driver-login/driver-login';

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

  //array to store request information
  requests = [];
  //user's unique id
  userID = firebase.auth().currentUser.uid;
  //object
  driver = {
    driverID: "",
    driverFirstName: "",
    driverLastName: "",
    userType: ""
  };

  constructor( public toastCtrl: ToastController, public alertCtrl: AlertController, private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
 
    //gets request information from database
    firebase.database().ref(`Rides`).on( "value", ( snapshot )=>{
      this.requests =[];
      //loops through each request
      snapshot.forEach( data => {
        this.requests.push({
          id: data.key,
          value: data.val()
        });
        return false;
      });
    });
              
    //gets drivers information from database
    firebase.database().ref().child(`User/` + this.userID).once( "value", ( snapshot )=>{
      let result = snapshot.val();
      this.driver.driverID = this.userID;
      this.driver.driverFirstName = result.firstName;
      this.driver.driverLastName = result.lastName;
      this.driver.userType = result.type;
      });
  }

  //function to open modal page that holds passenger's information
  openModal(object){
    var obj = {
        driverID: this.driver.driverID,
        driverFirstName: this.driver.driverFirstName, 
        driverLastName: this.driver.driverLastName,
        driverUserType: this.driver.userType,
        rideID: object.id ,
        passengerFirstName : object.value.firstName,
        passengerLastName: object.value.lastName,
        passengerLocation : object.value.location,
        passengerPhone: object.value.phone,
        timeOfRequest: object.value.timeOfRequest,
        payment: object.value.payment,
        numOfPassengers: object.value.numOfPassengers
    }

    let modalPage = this.modalCtrl.create('CustomerModalPage',obj);
    modalPage.onDidDismiss(data => {
    });
    modalPage.present();
}

  //method to refresh page
  refresh(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //method to logout user
  logoutUser(){
    //firebase authentication sign out
    firebase.auth().signOut();
    this.navCtrl.setRoot(DriverLoginPage);
    //presents message that user was logged out
    let toast = this.toastCtrl.create({
      message: 'User was successfully logged out.',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad DriverHomePage');
  }
}
