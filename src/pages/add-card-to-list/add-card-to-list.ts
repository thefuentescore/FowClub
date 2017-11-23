import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { Card } from './../../models/card';
import { ListCard } from './../../models/listCard';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ListServiceProvider } from '../../providers/list-service/list-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the AddCardToListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-card-to-list',
  templateUrl: 'add-card-to-list.html',
})
export class AddCardToListPage {
  card: Card;
  listCard: ListCard = new ListCard();

  constructor(private listService: ListServiceProvider, public navParams: NavParams, public viewCtrl: ViewController, public toast: ToastServiceProvider) {
    this.card = navParams.data;
    this.listCard.code = this.card.code;
    this.listCard.name = this.card.name;
    this.listCard.attribute = this.card.attribute.trim();
  }
  addCardToSearchList() {
    this.listCard.listType = 0;
    this.listService.addCardToSearchList(this.listCard).then(() => {
      this.toast.createToast(this.card.name + " added to your list");
      this.viewCtrl.dismiss();
    });
  }
  addCardToOfferList() {
    this.listCard.listType = 1;
    this.listService.addCardToOfferList(this.listCard).then(() => {
      this.toast.createToast(this.card.name + " added to your list");
      this.viewCtrl.dismiss();
    });
  }

}
