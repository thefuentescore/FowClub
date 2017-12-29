import { Injectable } from '@angular/core';
import { UserServiceProvider } from '../user-service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider {

  constructor(public userService: UserServiceProvider, private database: AngularFireDatabase) {
    console.log('Hello ChatServiceProvider Provider');

  }

  //Get list of Chats of the logged User
  getChatList() {
    let id = this.userService.getCurrentUserId();
    return this.database.list(`users/${id}/chats`);
  }

  // Add Chat References to Both users
  addChats(uid, interlocutor) {
    // First User
    let endpoint = this.database.object(`/users/${uid}/chats/${interlocutor}`);
    endpoint.set(true);

    // Second User
    let endpoint2 = this.database.object(`/users/${interlocutor}/chats/${uid}`);
    endpoint2.set(true);
  }

  getChat(uid, interlocutor) {
    let firstRef = this.database.database.ref().child("chats").child(`${uid},${interlocutor}`);
    let promise = new Promise((resolve, reject) => {
      firstRef.once('value', function (snapshot) {
        if (snapshot.exists()) {
          resolve(`/chats/${uid},${interlocutor}`);
        } else {
          resolve(`/chats/${interlocutor},${uid}`);
        }
      });
    });
    return promise;
  }
  }




