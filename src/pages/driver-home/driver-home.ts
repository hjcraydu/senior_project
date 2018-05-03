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


  requests = [];
  userID = firebase.auth().currentUser.uid;
  driver = {
    driverID: "",
    driverFirstName: "",
    driverLastName: "",
    userType: ""
  };

  user = firebase.auth().currentUser.uid;

  constructor( public toastCtrl: ToastController, public alertCtrl: AlertController, private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
 
    firebase.database().ref(`Rides`).once( "value", ( snapshot )=>{
   
                  snapshot.forEach( data => {
                    
                    this.requests.push({
                      id: data.key,
                      value: data.val()
                    });
                    
                    return false;
                   });
                console.log(this.requests);
              });
            

    firebase.database().ref().child(`User/` + this.userID).once( "value", ( snapshot )=>{
      let result = snapshot.val();
      this.driver.driverID = this.userID;
      this.driver.driverFirstName = result.firstName;
      this.driver.driverLastName = result.lastName;
      this.driver.userType = result.type;
      console.log(this.driver);
      });

      console.log(this.user);
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

    console.log(obj);

    let modalPage = this.modalCtrl.create('CustomerModalPage',obj);
    modalPage.onDidDismiss(data => {
    });

    modalPage.present();
}

  refresh(){
  
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  logoutUser(){
    firebase.auth().signOut();
    this.navCtrl.setRoot(DriverLoginPage);
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
