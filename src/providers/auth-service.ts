import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
//...omitted
@Injectable()
export class AuthService {
  
  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  
}