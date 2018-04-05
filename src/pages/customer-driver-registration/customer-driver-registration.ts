import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CustomerHomePage } from '../customer-home/customer-home';
import { HomePage } from '../home/home';

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

  user = {} as User;

  public empCode: string = 'UnchainedPedicabs2018';

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

/*  doPrompt() {

  let alert = this.alertCtrl.create({
    title: 'Please enter the employee code',
    inputs: [
      {
        name: 'code',
        placeholder: 'Code'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Enter',
        handler: data => {
          if (User.isValid(data.username, data.password)) {
            // logged in!
          } else {
            // invalid login
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}*/

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully. Please proceed to login.',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

   async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);

    }
    catch (e) {
      console.error(e);
    }



    this.afAuth.authState.take(1).subscribe(auth =>{
        this.afDatabase.object(`User/${auth.uid}`).set(this.user)
          .then(() => this.navCtrl.setRoot(HomePage));
      })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDriverRegistrationPage');
  }

}
