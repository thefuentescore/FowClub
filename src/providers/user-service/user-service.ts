import { firebaseConfig } from './../../app/app.module';
import { UserData } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  private basePath: string = 'users';
  currentUser: UserData = null;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private firebase: FirebaseApp, public local: Storage) {
    afAuth.auth.setPersistence("local");
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
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

  getDatabaseUser() {
    return this.database.database.ref().child(this.basePath).child(this.userId);
  }

  getUserData(id: string){
    return this.database.database.ref().child(this.basePath).child(id);
  }

  getCurrentUserId() {
    return this.userId;
  }

  checkAuthentication() {
    return this.afAuth.authState;
  }

  createUserProfile(data: UserData) {

    if (data.photo) {
      let storageRef = this.firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${this.userId}`).putString(data.photo, 'data_url');

      this.afAuth.auth.currentUser.updateProfile({
        displayName: data.userName,
        photoURL: uploadTask.snapshot.downloadURL
      }).catch(err => {
        console.log(err);
      })

      return uploadTask.then(() => {
        data.photo = uploadTask.snapshot.downloadURL;
        this.database.object(`users/${this.userId}`).set(data);
      });
    } else {
      return this.database.object(`users/${this.userId}`).set(data);
    }
  }
}






