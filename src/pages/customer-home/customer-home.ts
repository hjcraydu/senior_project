import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Request } from '../../models/request';
import firebase from 'firebase';
import moment from 'moment';
import { ChatPage } from '../chat/chat';
import { CustomerLoginPage } from '../customer-login/customer-login';
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

  request = {
    firstName: "",
    lastName: "",
    phone: "",
    timeOfRequest: "",
    passengerID: "",
    type: ""
  };
  userID = firebase.auth().currentUser;

  myGroup: FormGroup;
  location: AbstractControl;
  numOfPassengers: AbstractControl;
  payment: AbstractControl;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    //refences user node in database using unique identifier
    firebase.database().ref().child(`User/` + this.userID.uid).once( "value", ( snapshot )=>{
      let result = snapshot.val();
      this.request['firstName']= result.firstName;
      this.request['lastName'] = result.lastName;
      this.request['phone'] = result.phone;
      this.request['type'] = result.type;
    });

    this.myGroup = formBuilder.group({
      location: ['', Validators.required],
      numOfPassengers: ['', Validators.required],
      payment: ['', Validators.required]
    });

    this.location = this.myGroup.controls['location'];
    this.numOfPassengers = this.myGroup.controls['numOfPassengers'];
    this.payment = this.myGroup.controls['payment'];
  }

username: string = "";
requestID: string = "";
createRequest(request: Request) {
 //sets data to string variables
  this.request.timeOfRequest = this.currentDateTime;
  this.request['passengerID'] = this.userID.uid;
  var requestData = firebase.database().ref(`Rides`).push(this.request);
  var key = requestData.key;
       
  //pushes ride request's information to database
  requestData.push()
    .then(() => this.navCtrl.push(ChatPage, {
      username: this.request.firstName,
      requestID: key,
      userType: this.request.type
        })
      );
      let alert = this.alertCtrl.create({
        title: 'Please Wait',
        message: 'Please wait for a driver to join the chat before sending a message!',
        buttons: [
          {
            text: 'Close',
            role: 'close',
            handler: () => {
              console.log('Close clicked')
            }
          }
        ]
      });
     alert.present();
}

logoutUser(){
  firebase.auth().signOut();
  this.navCtrl.setRoot(CustomerLoginPage);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerHomePage');
  }

}
