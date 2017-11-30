import { Match } from './../../models/match';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ChatviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-chatview',
  templateUrl: 'chatview.html',
})
export class ChatviewPage {
  message: string;
  
  uid: string;
  userName: string;

  toUserId: string;
  toUser: Observable < any > ;

  chats: Observable < any[] > ;
  fireListChat: AngularFireList < any[] > ;
  chatRef: any;
  @ViewChild(Content) content: Content;

  constructor(public nav: NavController, params: NavParams, public chatsProvider: ChatServiceProvider, public db: AngularFireDatabase, public userProvider: UserServiceProvider) {

    //Current user info
    this.uid = params.data.uid;
    this.userName = this.userProvider.getCurrentUserName();
    //Interlocutor user info
    this.toUserId = params.data.interlocutor;
    this.toUser = this.userProvider.getUserData(this.toUserId).valueChanges();
    // Get Chat Reference
    this.chatsProvider.getChat(this.uid, this.toUserId).then((chatRef: any) => {
      this.chatRef = chatRef;
      this.fireListChat = this.db.list(this.chatRef);
      this.chats = this.fireListChat.valueChanges();
    });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }


  sendMessage(userName: string) {
    if (this.message) {
      let chat = {
        from: this.uid,
        fromName: this.userName,
        message: this.message,
        type: 'message'
      };
      this.db.database.ref(this.chatRef).push(chat);
      this.message = "";
    }
  };

  onFocus() {
    this.content.scrollToBottom();
  }

}


