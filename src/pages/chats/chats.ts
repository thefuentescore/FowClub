import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatviewPage } from '../chatview/chatview';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 @Component({
   selector: 'page-chats',
   templateUrl: 'chats.html',
 })
 export class ChatsPage {

   chats: Observable<any[]>;

   constructor(public chatsProvider: ChatServiceProvider, public userProvider: UserServiceProvider, public database: AngularFireDatabase, public navCtrl: NavController) {

    this.chats = this.chatsProvider.getChatList().snapshotChanges().map(actions =>{
      return actions.map( a =>{
        const id = a.payload.key;
        const userInfo = this.userProvider.getUserData(id).valueChanges();
        const newMessage =  this.chatsProvider.getChatNewMessages(id).valueChanges();        
        return{id, userInfo, newMessage};
      });
    });
     console.log(this.chats);
   }


   openChat(chat) {
     let param = {
       uid: this.userProvider.getCurrentUserId(),
       interlocutor: chat.id
     };
     this.navCtrl.push(ChatviewPage, param);
   }

 }





