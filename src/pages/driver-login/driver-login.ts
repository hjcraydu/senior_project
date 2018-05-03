import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CustomerDriverRegistrationPage } from '../customer-driver-registration/customer-driver-registration';
import { DriverHomePage } from '../driver-home/driver-home';
import * as firebase from 'firebase';


/**
 * Generated class for the CustomerLoginPage page.
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

  formgroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private loadCtrl: LoadingController, private formBuilder: FormBuilder, private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

    //validates that inputs are filled
    this.formgroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.email = this.formgroup.controls['email'];
    this.password = this.formgroup.controls['password'];
  }

  async login(user: User)
{
  if(user.email == null || user.password == null){
    //displays alert if inputs are null
    let alert = this.alertCtrl.create({
    title: 'No email/password entered!',
    subTitle: 'Please enter your email/password.',
    buttons: ['Dismiss']
  });
  alert.present();
  }else{
  //signs in user if their information exists and is correct
  this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
  .then(user => {
    firebase.database().ref('User/' + user.uid).once('value', snapshot =>{
      if(snapshot.val().type == 'driver'){
        this.navCtrl.setRoot(DriverHomePage);
      } else {
        let error = this.alertCtrl.create({
          title: 'Wrong User Login',
          subTitle: 'Please make sure that you are using the right login portal!',
          buttons: [
            {
            text: 'Dismiss',
            role: 'dismis',
          handler: () => {
            console.log('Cancel clicked');
            this.user.email = "";
             this.user.password="";
          }}
        ]
        });
        error.present();
        this.navCtrl.setRoot(DriverLoginPage);
      }
    })
  }, err =>{
    let error = this.alertCtrl.create({
      title: 'Email or password is incorrect!',
      subTitle: 'Please enter correct email and password.',
      buttons: [
        {
        text: 'Dismiss',
        role: 'dismis',
      handler: () => {
        console.log('Cancel clicked');
        this.user.email = "";
    this.user.password="";
      }}]
      });
    error.present();
  })
}
}

clear(){
  this.user.email = "";
  this.user.password="";
}
    ionViewDidLoad() {
      console.log('ionViewDidLoad DriverLoginPage');
    }

  }
