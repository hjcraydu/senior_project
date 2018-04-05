import FirebaseObjectObservable from 'angularfire2/database';
export interface Request {
  //name: FirebaseObjectObservable<any>;
//  phone: FirebaseObjectObservable<any>;
  location: string;
  numOfPassengers: string;
  payment: string;
  timeOfRequest: string;
}
