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

  //Get the new Messages of the current user and given user chat
  getChatNewMessages(userId){
    let currentId = this.userService.getCurrentUserId();
    return this.database.object(this.database.database.ref().child(`/users/${currentId}/chats/${userId}`));
  }

  //Adds +1 to the new messages of the interlocutor chat
  addNewMessageToUser(userId){
    let currentId = this.userService.getCurrentUserId();
    this.database.object(`users/${userId}/chats/${currentId}/newMessages`).query.ref.transaction((newMessages => {
      if (newMessages === null) {
        return newMessages = 1;
      } else {
        return newMessages + 1;
      }
    }));
  }

  refreshNewMessages(userId){
    let currentId = this.userService.getCurrentUserId();
    this.database.database.ref(`users/${currentId}/chats/${userId}/newMessages`).set(0);
  }

  // Add Chat References to Both users
  addChats(uid, interlocutor) {
    // First User
    let endpoint = this.database.object(`/users/${uid}/chats/${interlocutor}/newMessages`);
    endpoint.set(0);

    // Second User
    let endpoint2 = this.database.object(`/users/${interlocutor}/chats/${uid}/newMessages`);
    endpoint2.set(0);
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




