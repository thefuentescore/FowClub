import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cardRef: AngularFireList<any>;
  cards: Observable<any[]>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase){
    this.cardRef = this.database.list('cards');
    this.cards = this.cardRef.snapshotChanges().map(changes =>{
      return changes.map(c => ({key: c.payload.key,...c.payload.val()}));
    })
  }

}
