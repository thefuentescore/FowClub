import { ListCard } from './../../models/listCard';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'firebase/storage';
/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListServiceProvider {
  private basePathOffer: string = 'offerLists';
  private basePathSearch: string = 'searchLists';

  userId: string;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase) {
    afAuth.auth.setPersistence("local");
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }else{
        console.log("logged out");
      }
    });
  }

  //CURRENT USER SERVICES
  getCurrentUserSearchedList() {
    return this.database.list(this.database.database.ref().child(this.basePathSearch).child(this.userId));
  }
  getCurrentUserOfferedList() {
    return this.database.list(this.database.database.ref().child(this.basePathOffer).child(this.userId));
  }
  addCardToOfferList(card: ListCard) {
    return this.database.database.ref().child(this.basePathOffer).child(this.userId).child(card.code).set(card);
  }
  addCardToSearchList(card: ListCard) {
    return this.database.database.ref().child(this.basePathSearch).child(this.userId).child(card.code).set(card);
  }
  removeCardFromSearch(card: ListCard) {
    return this.database.database.ref().child(this.basePathSearch).child(this.userId).child(card.code).remove();
  }
  removeCardFromOffered(card: ListCard) {
    return this.database.database.ref().child(this.basePathOffer).child(this.userId).child(card.code).remove();
  }
  updateCardToOfferList(card: ListCard) {
    return this.database.database.ref().child(this.basePathOffer).child(this.userId).child(card.code).update(card);
  }
  updateCardToSearchList(card: ListCard) {
    return this.database.database.ref().child(this.basePathSearch).child(this.userId).child(card.code).update(card);
  }
  // GIVEN USER SERVICE
  getUserSearchedList(id: string) {
    return this.database.list(this.database.database.ref().child(this.basePathSearch).child(id));
  }
  getUserOfferedList(id: string) {
    return this.database.list(this.database.database.ref().child(this.basePathOffer).child(id));
  }
  //ALL USERS SERVICE
  getAllSearchedList() {
    return this.database.list(this.database.database.ref().child(this.basePathSearch));
  }
  getAllOfferedList() {
    return this.database.list(this.database.database.ref().child(this.basePathOffer));
  }
}


