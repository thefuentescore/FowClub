import { firebaseConfig } from './../../app/app.module';
import { UserData } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  private basePath: string = 'users';
  currentUser: AngularFireObject < UserData > = null;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private firebase: FirebaseApp) {
    afAuth.auth.setPersistence("local");
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  userProfileExist(){
    return this.database.database.ref().child(this.basePath).child(this.userId);
  }

  createUserProfile(data: UserData) {
    let storageRef = this.firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.userId}`).putString(data.photo);
    return uploadTask.then(()=>{
      data.photo = uploadTask.snapshot.downloadURL;
      this.database.object(`users/${this.userId}`).set(data);
    });
  }
}




