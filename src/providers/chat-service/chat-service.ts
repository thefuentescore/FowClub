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
  getChats() {
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
  getChatRef(uid, interlocutor) {
    return this.database.list(`/chats/${uid},${interlocutor}`);
  }
}


