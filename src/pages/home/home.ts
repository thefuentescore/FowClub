import { Card } from './../../models/card';
import { CardServiceProvider } from './../../providers/card-service/card-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Card[];
  searchName = "";
  constructor(public cardService: CardServiceProvider, public navCtrl: NavController) {
    cardService.getAllCards().forEach(cards => {
      this.cards = cards;
      cards.forEach(card => {
        this.getCardImage(card);
      })
    });
  }
  ionViewWillLoad() {

  }
  getCardImage(card: Card) {
    this.cardService.setCardImage(card);
  }

}

