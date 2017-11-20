import { ListCard } from './../../models/listCard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
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
  offerLists: Map < string, ListCard > = new Map < string, ListCard > ();
  searchLists: Map < string, ListCard > = new Map < string, ListCard > ();

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private firebase: FirebaseApp) {
    afAuth.auth.setPersistence("local");
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.setListeners();
      }
    });
  }
  setListeners() {
    const dbRefOffer = this.database.database.ref().child(this.basePathOffer);
    const dbRefSearch = this.database.database.ref().child(this.basePathSearch);
    //Offer
    dbRefOffer.on('child_added', snap => {
      this.offerLists.set(snap.key, snap.val());
    });
    dbRefOffer.on('child_removed', snap => {
      if (this.offerLists.has(snap.key))
        this.offerLists.delete(snap.key);
    });
    dbRefOffer.on('child_changed', snap=>{
      this.offerLists.set(snap.key, snap.val());
    });
    //Search
    dbRefSearch.on('child_added', snap => {
      this.searchLists.set(snap.key, snap.val());
    });
    dbRefSearch.on('child_removed', snap => {
      if (this.searchLists.has(snap.key))
        this.searchLists.delete(snap.key);
    });
    dbRefSearch.on('child_changed', snap=>{
      this.searchLists.set(snap.key, snap.val());
    });
  }

  addCardToOfferList(card: ListCard){
    return this.database.database.ref().child(this.basePathOffer).child(this.userId).child(card.code).set(card);
  }
  addCardToSearchList(card: ListCard){
    return this.database.database.ref().child(this.basePathSearch).child(this.userId).child(card.code).set(card);
  }
}

