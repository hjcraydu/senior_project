import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../models/user'; //imports user model inputs
import firebase from 'firebase';
import { CustomerLoginPage } from '../customer-login/customer-login';
import { CustomerHomePage } from '../customer-home/customer-home';
/**
 * Generated class for the CustomerDriverRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-driver-registration',
  templateUrl: 'customer-driver-registration.html',
})
export class CustomerDriverRegistrationPage {

  //User object
  user = {} as User;

  //form validation variables
  myForm: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  phone: AbstractControl;

  constructor(public toastCtrl: ToastController, public fb: FormBuilder, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    //form validation is created with validators
    this.myForm = this.fb.group({
      firstName : ['',Validators.compose([Validators.required, Validators.minLength(1)])],
      lastName : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      email : ['', Validators.required],
      password : ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      phone : ['', Validators.required],
    })

    //assigns form validation variables to values
    this.firstName = this.myForm.controls['firstName'];
    this.lastName = this.myForm.controls['lastName'];
    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];
    this.phone = this.myForm.controls['phone'];
  }
  //method for user registration
   async register(user: User) {

    //alert to asure user's data is correct
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Before registering, check your information!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: () => {
            console.log('Register clicked');
            //uses Firebase's Authentication Services to store email and password
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
              //creates user child with user's information
              firebase.database().ref().child(`User/${response.uid}`).set({email: this.user.email, firstName: this.user.firstName, lastName: this.user.lastName, phone: this.user.phone, type: "customer"})
              //user is directed to login page
              .then(() => this.navCtrl.setRoot(CustomerLoginPage));
          }).catch(error => {
            console.log("Error registering user",error);
          });

          //message is created to confirm that the user was created
          let toast = this.toastCtrl.create({
            message: 'User was created successfully. Please proceed to login.',
            duration: 3000,
            position: 'top'
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
          }
        }
      ]
    });
    alert.present(); 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDriverRegistrationPage');
  }

}
