import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  private basePath: string = '/users';
  currentUser: User;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase) {
    afAuth.auth.setPersistence("local");
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser.$key = user.uid;
      }
    })
  }

  register(email: string, password: string): boolean{
   try{
      const result = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      if(result){
        return true;
      }else{
        return false;
      }
   }catch(err){
     console.error(err);
   }

  }

  login(email: string, password: string) {
    try {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
    }
  }

  isUserLogged(): boolean {
    return this.afAuth.auth.currentUser ? true : false;
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

}



