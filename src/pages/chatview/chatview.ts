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
  interlocutor: string;
  chats: Observable < any[] > ;
  @ViewChild(Content) content: Content;

  constructor(public nav: NavController, params: NavParams, public chatsProvider: ChatServiceProvider, public db: AngularFireDatabase, public userProvider: UserServiceProvider) {

    this.uid = params.data.uid;
    this.interlocutor = params.data.interlocutor;

    // Get Chat Reference
    this.chats = this.chatsProvider.getChatRef(this.uid, this.interlocutor)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }


  sendMessage() {
    if (this.message) {
      let chat = {
        from: this.uid,
        message: this.message,
        type: 'message'
      };
      this.chatsProvider.getChatRef(this.uid, this.interlocutor).push(chat);
      this.message = "";
    }
  };

  sendPicture() {
    let chat = {
      from: this.uid,
      type: 'picture',
      picture: null
    };
    /*
    this.userProvider.getPicture()
      .then((image) => {
        chat.picture = image;
        this.chats.push(chat);
      });
      */
  }
}


