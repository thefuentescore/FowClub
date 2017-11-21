import { SearchedTab, OfferedTab } from './tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  searchedTab = SearchedTab;
  offeredTab = OfferedTab;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
