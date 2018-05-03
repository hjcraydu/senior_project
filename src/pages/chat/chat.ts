import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { DriverHomePage } from '../driver-home/driver-home';
import { CustomerHomePage } from '../customer-home/customer-home';
import firebase from 'firebase';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  
  //creates string variables where navParam values can be stored.
  username: string="";
  rideID: string="";
  message: string="";
  _chatSubscription;
  messages: object[]=[];

  driverID: string;
  passengerID: string;
  userType: string;

  constructor( public alertCtrl: AlertController, public loadCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    //navParams values from previous page is stored
    this.username = this.navParams.get('username');
    this.rideID = this.navParams.get('requestID');
    this.userType = this.navParams.get('userType');
    console.log(this.userType);
    //references database and creates a new child where messages can be stored
    this._chatSubscription = firebase.database().ref(`Rides in Progress/${this.rideID}/Messages`).on('value', snapshot => {
      let tmp = [];
      snapshot.forEach( data => {
        tmp.push({
  				key: data.key,
  				username: data.val().username,
          message: data.val().message
          //sendDate: Date()
        });
        return false;
       });
       this.messages = tmp;
       console.log(this.messages);
    });
  }

  send(){
    //sends the messages to the child Messages
    firebase.database().ref().child(`Rides in Progress/${this.rideID}/Messages`).push().set({
      username: this.username,
      message: this.message
    }).then(()=>{
      //message is sent
    }).catch(() => {
      //some error message
    })

    console.log(this.username, this.message);
    
    
    this.message = '';
   }

   closeChat(){

    let alert = this.alertCtrl.create({
      title: 'Leave the Chat',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Leave',
          role: 'leave',
          handler: () => {
            console.log('Leave clicked');
            this.navCtrl.pop();
          }
  }]});
  alert.present();
  }

  ionViewDidLoad() {
    firebase.database().ref().child(`Rides in Progress/${this.rideID}/Messages`).push().set({
      username: this.username,
      message: `${this.username} joined the chat`
    });
    
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillLeave(){
    
    firebase.database().ref().child(`Rides in Progress/${this.rideID}/Messages`).push().set({
      username: this.username,
      message: `${this.username} left the chat`
    });
   
    console.log('ionViewWillLeave ChatPage');
   
  }

}
