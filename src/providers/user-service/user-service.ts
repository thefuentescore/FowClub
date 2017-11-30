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

  //AUTHENTICATION FUNCTIONS
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  checkAuthentication() {
    return this.afAuth.authState;
  }

  //USER FUNCTIONS
  getUserData(id: string) {
    return this.database.object(this.database.database.ref().child(this.basePath).child(id));
  }

  // CURRENT USER FUNCTIONS
  getCurrentUserName() {
    return this.afAuth.auth.currentUser.displayName;
  }

  getCurrentUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  getCurrentUserPhoto(){
    return this.afAuth.auth.currentUser.photoURL? this.afAuth.auth.currentUser.photoURL : "assets/imgs/avatar.png";
  }

  getDatabaseUser() {
    return this.database.database.ref().child(this.basePath).child(this.afAuth.auth.currentUser.uid);
  }

  //PROFILE FUNCTIONS
  createUserProfile(data: UserData) {

    if (data.photo) {
      let storageRef = this.firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${this.userId}`).putString(data.photo, 'data_url');
      return uploadTask.then(() => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: data.userName,
          photoURL: uploadTask.snapshot.downloadURL
        }).catch(err => {
          console.log(err);
        })
        data.photo = uploadTask.snapshot.downloadURL;
        this.database.object(`users/${this.userId}`).set(data);
      });
    } else {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: data.userName,
        photoURL: ""
      }).catch(err => {
        console.log(err);
      })
      return this.database.object(`users/${this.userId}`).set(data);
    }
  }
}






