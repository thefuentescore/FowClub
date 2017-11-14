import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  private currentUser = {} as User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.auth.setPersistence("local");

  }
  register(email: string, password: string): boolean {
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log(result);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  login(email: string, password: string): boolean {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  
  getCurrentUser() : User{

    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser.email = user.email;
        this.currentUser.userName = user.displayName;
        this.currentUser.photo = user.photoURL;
      } else {
       this.currentUser =  null;
      }
    });
    return this.currentUser;
  }

}

