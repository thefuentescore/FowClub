import { ChatServiceProvider } from './../../providers/chat-service/chat-service';
import { Match } from './../../models/match';
import { ListCard } from './../../models/listCard';
import { MatchServiceProvider } from './../../providers/location-service/location-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ListServiceProvider } from '../../providers/list-service/list-service';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ChatviewPage } from '../chatview/chatview';


@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  geolocationOptions = {
    maximumAge: 60000,
    timeout: 10000,
    enableHighAccuracy: true
  };

  matches: Observable<Match[]>;
  
  constructor(
    private matchService: MatchServiceProvider, 
    private listService: ListServiceProvider, 
    private userService: UserServiceProvider,
    private chatService: ChatServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase, 
    private geolocation: Geolocation) {  }

  ionViewDidEnter() {
    this.getLocation();
    this.matches = this.matchService.getMatches();
  }

  ionViewDidLeave(){
    this.matchService.removeMatches();
  }
  private getLocation() {
    this.geolocation.getCurrentPosition(this.geolocationOptions).then(position =>{
      this.matchService.updateMatches(500, [position.coords.latitude, position.coords.longitude]);
    });
  }

  openChat(interlocutor: string){
    let param = {uid: this.userService.getCurrentUserId(), interlocutor: interlocutor};
    this.chatService.addChats(param.uid, param.interlocutor);
    this.navCtrl.push(ChatviewPage,param);
  }
}


