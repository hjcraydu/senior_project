import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import firebase from 'firebase';
import { DriverHomePage } from '../driver-home/driver-home';
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

  //variables to store data
  driverID: string="";
  driverFirstName: string="";
  driverLastName: string="";
  driverName: string="";
  driverUserType: string="";
  
  rideID: string="";
  passengerFirstName: string="";
  passengerLastName: string="";
  passengerLocation: string="";
  passengerPhone: string="";
  passengerPayment: string="";
  passengerTimeofRequest: string="";
  passengerNumOfPassengers: string="";

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    
    //assigns navParams values to object
    this.driverID = navParams.get("driverID");
    this.driverFirstName = navParams.get("driverFirstName");
    this.driverLastName = navParams.get("driverLastName");
    this.driverName = this.driverFirstName +" "+this.driverLastName;
    this.driverUserType = navParams.get("driverUserType");
  
    //assigns navParams values in variables
    //this information is displayed in the html
    this.rideID = navParams.get("rideID");
    this.passengerFirstName = navParams.get("passengerFirstName");
    this.passengerLastName = navParams.get("passengerLastName");
    this.passengerLocation = navParams.get("passengerLocation");
    this.passengerPhone = navParams.get("passengerPhone");
    this.passengerPayment = navParams.get("payment");
    this.passengerTimeofRequest = navParams.get("timeOfRequest");
    this.passengerNumOfPassengers = navParams.get("numOfPassengers");   
  }

  //variables for username and accept buttons state
  username: string = "";
  acceptButtonPressed=false; 

  //method to accept request
  acceptRequest(object){
    //creates alert to confirm that the driver is selecting the correct job
    let alert = this.alertCtrl.create({
      title: 'Accept Job',
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
          text: 'Accept',
          handler: () => {
            console.log('Accept clicked');
            //adds driver's information to rides child in the database
            var id = this.rideID;
            //console.log(id);
            firebase.database().ref(`Rides/` + id).once('value', function(snap) {
              //moves child to another child
              firebase.database().ref('Rides in Progress/').child(id).update(snap.val(), function(error) {
                if(!error){
                  //deletes pre-existing child
                  firebase.database().ref(`Rides/` + id).remove();
                }
                else if( typeof(console) !== 'undefined' && console.error ) {
                  let alert = this.alertCtrl.create({
                    title: 'ERROR',
                    message: 'ERROR',
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
                }
              });
            });

            //driver's information is added to child
            firebase.database().ref(`Rides in Progress/` + this.rideID).update({driverID: this.driverID, driverName: this.driverName})
            .then(() => this.navCtrl.push(ChatPage, {
              requestID: this.rideID,
              username: this.driverFirstName+" - Driver",
              userType: this.driverUserType
            }));
            this.acceptButtonPressed = true;
          }
        }
      ]
    });
    alert.present();
  }

  //method to mark that ride is completed
  completeRide(object){
      //alert to confirm that the request should be completed
      let alert = this.alertCtrl.create({
        title: 'Mark as Completed?',
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
            text: 'Complete',
            handler: () => {
              console.log('Complete clicked');
              var id = this.rideID;
              //moves reference's child to new child
              firebase.database().ref(`Rides in Progress/` + id).once('value', function(snap) {
                firebase.database().ref('Completed Rides/').child(id).set(snap.val(), function(error) {
                  if(!error){
                    //removes pre-existing child
                    firebase.database().ref(`Rides in Progress/` + id).remove();
                  }
                  else if( typeof(console) !== 'undefined' && console.error ) {
                    //error alert
                    let alert = this.alertCtrl.create({
                      title: 'ERROR',
                      message: 'ERROR',
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
                  }
                });
              });
              //message to say that ride was completed
              let toast = this.toastCtrl.create({
                message: 'Ride was completed.',
                duration: 3000,
                position: 'top'
              });
            
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
            
              toast.present();
              this.navCtrl.setRoot(DriverHomePage);
            }
          }
        ]
      });
      alert.present();
    }

  //Closes modal page
  closeModal() {
    this.viewCtrl.dismiss();
  }
 
  ionViewWillLoad(){
    console.log();
  }

}
