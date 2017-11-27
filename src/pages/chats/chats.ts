import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { useAnimation } from '@angular/core/src/animation/dsl';

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

   chats: Observable < any[] > ;

   constructor(public chatsProvider: ChatServiceProvider, public userProvider: UserServiceProvider, public database: AngularFireDatabase, public navCtrl: NavController) {

     this.chats = this.chatsProvider.getChats()
       .snapshotChanges()
       .map(changes => {
         return changes.map(c => ({
             key: c.key,
             ...this.database.object(this.userProvider.getUserData(c.key))
           }))
         });
     console.log(this.chats);
   }


   openChat(key) {
     let param = {
       uid: this.userProvider.getCurrentUserId(),
       interlocutor: key
     };
     // this.nav.push(ChatViewPage, param);
   }


 }





