import { UserServiceProvider } from './../../providers/user-service/user-service';
import { CardServiceProvider } from './../../providers/card-service/card-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Card } from '../../models/card';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cards: Observable < Card[] > ;

  constructor(public cardService: CardServiceProvider, private userService: UserServiceProvider, public navCtrl: NavController) {
    if (userService.getCurrentUser()) {
      this.cards = cardService.getAllCards();
    }
  }

  ionViewWillLoad() {

  }


}
