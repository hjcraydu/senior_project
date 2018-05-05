import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CustomerDriverRegistrationPage } from '../customer-driver-registration/customer-driver-registration';
import { CustomerHomePage } from '../customer-home/customer-home';
import firebase from 'firebase';

/**
 * Generated class for the CustomerLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {

  //user object
  user = {} as User;

  //form validation variables
  formgroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private loadCtrl: LoadingController, private formBuilder: FormBuilder, private alertCtrl: AlertController,
    private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    //validates that inputs are filled
    this.formgroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    //asigns form validation variables to variables
    this.email = this.formgroup.controls['email'];
    this.password = this.formgroup.controls['password'];
  }

  //method to login
  async login(user:User)
  {
    if(user.email == null || user.password == null){
      //displays alert if inputs are null
      let alert = this.alertCtrl.create({
      title: 'No email/password entered!',
      subTitle: 'Please enter your email/password.',
      buttons: ['Dismiss']
    });
    alert.present();
    }
    else{
    //signs in user if their information exists and is correct
      this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
      .then(user => {
        firebase.database().ref('User/' + user.uid).once('value', snapshot =>{
          if(snapshot.val().type == 'customer'){
            this.navCtrl.setRoot(CustomerHomePage);
          } else {
            //error to display if user is trying to log into the wrong login interface
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
                  }
                }
               ]
            });
            error.present();
            this.navCtrl.setRoot(CustomerLoginPage);
          }
        })
      }, err => {
        //error message if inputs are incorrect
        let error = this.alertCtrl.create({
          title: 'Email or password is incorrect!',
          subTitle: 'Please enter correct email and password.',
          buttons: [
            {
              text: 'Dismiss',
              role: 'dismis',
              handler: () => {
                console.log('Cancel clicked');
                //resets inputs
                this.user.email = "";
                this.user.password="";
              }
            }
          ]
        });
        error.present();
      })
    }
  }

  //method to register
  register() {
        this.navCtrl.push(CustomerDriverRegistrationPage);
      }


    ionViewDidLoad() {
      console.log('ionViewDidLoad CustomerLoginPage');
    }

}
