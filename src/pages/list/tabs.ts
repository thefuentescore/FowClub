import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { ListCard } from './../../models/listCard';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ListServiceProvider } from '../../providers/list-service/list-service';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { ViewCardImagePage } from '../view-card-image/view-card-image';
import { EditListCardPage } from '../edit-list-card/edit-list-card';

@Component({
  selector: 'page-list-searched',
  templateUrl: 'listSearched.html'
})
export class SearchedTab {

  list: ListCard[];

  constructor(public navCtrl: NavController, private listService: ListServiceProvider, public toast: ToastServiceProvider, public popover: PopoverController) {
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


  viewImage(selected: ListCard, event){
    let popover = this.popover.create(ViewCardImagePage,selected);
    popover.present({ev: event});
  }
  editCard(selected: ListCard){
    let popover = this.popover.create(EditListCardPage,selected);
    popover.present();
  }

}

@Component({
  selector: 'page-list-offered',
  templateUrl: 'listOffered.html'
})
export class OfferedTab {
  list: ListCard[];
  constructor(public navCtrl: NavController, private listService: ListServiceProvider, public toast: ToastServiceProvider, public popover: PopoverController) {
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

  viewImage(selected: ListCard, event){
    let popover = this.popover.create(ViewCardImagePage,selected);
    popover.present({ev: event});
  }
  editCard(selected: ListCard){
    let popover = this.popover.create(EditListCardPage,selected);
    popover.present();
  }

}

