import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListServiceProvider } from '../../providers/list-service/list-service';
import { ListCard } from '../../models/listCard';

/**
 * Generated class for the EditListCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-list-card',
  templateUrl: 'edit-list-card.html',
})
export class EditListCardPage {
  listCard: ListCard = new ListCard();
  constructor(private listService: ListServiceProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.listCard.code = this.navParams.data.code;
    this.listCard.attribute = this.navParams.data.attribute;
    this.listCard.brightness = this.navParams.data.brightness;
    this.listCard.listType = this.navParams.data.listType;
    this.listCard.name = this.navParams.data.name;
    this.listCard.price = this.navParams.data.price;
    this.listCard.rarity = this.navParams.data.rarity;
    this.listCard.state= this.navParams.data.state;
  }
  editCard() {
    if (this.listCard.listType == 0) {
      this.listService.updateCardToSearchList(this.listCard).then(() => {
        this.viewCtrl.dismiss();
      });
    } else if (this.listCard.listType == 1) {
      this.listService.updateCardToOfferList(this.listCard).then(() => {
        this.viewCtrl.dismiss();
      });
    }
  }
}


