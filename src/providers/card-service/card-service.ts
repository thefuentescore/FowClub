import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Card } from '../../models/card';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

/*
  Generated class for the CardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardServiceProvider {
  cards: Observable< Card[] > ;
  cardRef: AngularFireList < any > ;

  constructor(private database: AngularFireDatabase, private firebase: FirebaseApp) {
    this.cardRef = this.database.list('cards');
    this.cards = this.cardRef.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    })
  }
  getAllCards(): Observable < Card[] > {
    return this.cards;
  }
  setCardImage(card: Card) {
    var imageUrl: string;
    var childName = '/cards/' + card.code + '.png';
    const ref = this.firebase.storage().ref().child(childName);
    // Get the download URL
    ref.getDownloadURL().then(function (url) {
      // Insert url into an <img> tag to "download"
      card.image = url;
    }).catch(function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object_not_found':
         console.error("Object Not Found!");
          break;

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.error("Unauthorized access!");
          break;

        case 'storage/canceled':
          // User canceled the upload
          console.error("Upload Canceled");
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          console.error("Unknown error!");
          break;
      }
    });
  }


}


