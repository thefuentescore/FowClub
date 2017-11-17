import { ListCard } from './../../models/listCard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  card: ListCard = new ListCard();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.card.card =  navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardToListPage');
  }

}
