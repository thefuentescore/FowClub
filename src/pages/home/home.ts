import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cardRef: AngularFireList<any>;
  cards: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth,private toast: ToastController,public navCtrl: NavController, public database: AngularFireDatabase){
    this.cardRef = this.database.list('cards');
    this.cards = this.cardRef.snapshotChanges().map(changes =>{
      return changes.map(c => ({key: c.payload.key,...c.payload.val()}));
    })
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
      this.toast.create({
        message : `Welcome to FowClub, ${data.email}`,
        duration: 3000
      }).present();
      }
      else{
        this.toast.create({
          message : 'Could not find authentication details',
          duration: 3000
        }).present();
      }
    });
  }
}
