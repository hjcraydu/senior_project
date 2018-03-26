import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  loginCustomer(email: string, password: string): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

signupCustomer(email: string, password: string): Promise<any> {
  return firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then( newUser => {
    firebase
    .database()
    .ref('/userProfile')
    .child(newUser.uid)
    .set({ email: email });
  });
}

resetPassword(email: string): Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

logoutCustomer(): Promise<void> {
  return firebase.auth().signOut();
}

}
