import { AddCardToListPage } from './../add-card-to-list/add-card-to-list';
import { Card } from './../../models/card';
import { CardServiceProvider } from './../../providers/card-service/card-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { ListServiceProvider } from '../../providers/list-service/list-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Card[];
  searchName = "";
  constructor(public popover: PopoverController, 
              public cardService: CardServiceProvider, 
              public listService: ListServiceProvider,
              public navCtrl: NavController, 
              public menu: MenuController) {
    //Enable side menu
    this.menu.swipeEnable(true);
    //Get all the existing cards
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

  openAddPopover(selected: Card){
    let popover = this.popover.create(AddCardToListPage,selected,{cssClass:'card-popover'});
    popover.present();
  }

}

