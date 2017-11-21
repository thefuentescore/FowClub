import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { ListCard } from './../../models/listCard';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ListServiceProvider } from '../../providers/list-service/list-service';

@Component({
  selector: 'page-list-searched',
  templateUrl: 'listSearched.html'
})
export class SearchedTab {

  list: ListCard[];

  constructor(public navCtrl: NavController, private listService: ListServiceProvider, public toast: ToastServiceProvider) {
    this.listService.getCurrentUserSearchedList().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.key,
        ...c.payload.val()
      }));
    }).forEach(cards => {
      this.list = cards;
    });
  }

  removeCard(card: ListCard){
    this.listService.removeCardFromSearch(card).then(()=>{
      this.toast.createToast(card.name + " removed from your list.");
    }).catch(err =>{
      this.toast.createToast("Couldn't remove " + card.name + " from the list.");
      console.error(err);
    });
  }

}

@Component({
  selector: 'page-list-offered',
  templateUrl: 'listOffered.html'
})
export class OfferedTab {
  list: ListCard[];
  constructor(public navCtrl: NavController, private listService: ListServiceProvider, public toast: ToastServiceProvider) {
    this.listService.getCurrentUserOfferedList().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.key,
        ...c.payload.val()
      }));
    }).forEach(cards => {
      this.list = cards;
    });
  }
  removeCard(card: ListCard){
    this.listService.removeCardFromOffered(card).then(()=>{
      this.toast.createToast(card.name + " removed from your list.");
    }).catch(err =>{
      this.toast.createToast("Couldn't remove " + card.name + " from the list.");
      console.error(err);
    });
  }
}

