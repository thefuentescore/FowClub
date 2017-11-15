import { Card } from './../../models/card';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { CardServiceProvider } from './../../providers/card-service/card-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Card[];
  constructor(public cardService: CardServiceProvider, private userService: UserServiceProvider, public navCtrl: NavController) {
    if (userService.getCurrentUser()) {
      cardService.getAllCards().forEach(cards =>{
        this.cards = cards;
        cards.forEach(card =>{
          this.getCardImage(card);
        })
      });
    }
  }

  ionViewWillLoad() {

  }

  getCardImage(card: Card){
    this.cardService.setCardImage(card);
  }

}
