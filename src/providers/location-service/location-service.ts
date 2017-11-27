import { AngularFireList } from 'angularfire2/database/interfaces';
import { ListCard } from './../../models/listCard';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as GeoFire from"geofire";
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Match } from '../../models/match';
/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MatchServiceProvider {

  dbLocationsRef: any;
  dbOfferListsRef: any;
  dbUsersRef: any;
  dbMatchRef: any;
  dbSearchList: any;
  geoFire: any;

  userId: string;
  matches: Array < any > ;
  currentUserSearchList: ListCard[];

  geolocationOptions = {
    maximumAge: 60000,
    timeout: 10000,
    enableHighAccuracy: true
  };

  constructor(private database: AngularFireDatabase, private geolocation: Geolocation, private afAuth: AngularFireAuth) {
    console.log('Hello LocationServiceProvider Provider');
    this.dbLocationsRef = this.database.database.ref().child('locations');
    this.dbOfferListsRef = this.database.database.ref().child('offerLists');
    this.dbMatchRef = this.database.database.ref().child('matches');
    this.dbUsersRef = this.database.database.ref().child('users');
    this.dbSearchList = this.database.database.ref().child('searchLists');

    this.geoFire = new GeoFire(this.dbLocationsRef);

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.database.list(this.dbSearchList.child(this.userId)).snapshotChanges().map(changes => {
          return changes.map(c => ({
            key: c.key,
            ...c.payload.val()
          }));
        }).forEach(cards => {
          this.currentUserSearchList = cards;
        });
      } else {
        console.log("not authentication")
      }
    });

    this.geolocation.watchPosition().subscribe(position => {
      console.log("Current Position: " + position.coords.latitude + " : " + position.coords.longitude);
      this.setLocation(this.userId, [position.coords.latitude, position.coords.longitude]);
    });
  }

  setLocation(key: string, coords: Array < number > ) {
    this.geoFire.set(key, coords)
      .then(() => console.log('location updated'))
      .catch(err => console.log(err));
  }

  getMatches(): Observable < Match[] > {
    return this.database.list(this.dbMatchRef.child(this.userId)).valueChanges();
  }
  removeMatches(): void{
    return this.dbMatchRef.child(this.userId).remove();
  }

  updateMatches(radius: number, coords: Array < number > ) {
    this.geoFire.query({
        center: coords,
        radius: radius
      })
      .on('key_entered', (key, location, distance) => {
        if (key != this.userId) {

          let match: Match;
          let user: any;
          let cards: any;

          this.dbUsersRef.child(key).once("value", snap => {
            user = snap.val();
          }).then(() => {
            this.dbOfferListsRef.child(key).once("value", snap => {
              let offers: ListCard[] = [];
              snap.forEach(element => {
                offers.push(element.val());
              });
              if (this.isMatch(offers)) {
                if (user.photo) {
                  match = {        
                    id: key,          
                    user: user.userName,
                    photo: user.photo,
                    distance: Math.round(distance),
                    cards: offers
                  };
                } else {
                  match = {
                    id: key,
                    user: user.userName,
                    photo: "assets/imgs/avatar.png",
                    distance: Math.round(distance),
                    cards: offers
                  };
                }
                this.dbMatchRef.child(this.userId).child(key).set(match);
              }
            });
          });
        }
      });
  }

  isMatch(list: ListCard[], ): boolean {
    return list.some(r => {
        for (var i = 0; i < this.currentUserSearchList.length; i++) {
          if (this.currentUserSearchList[i].code == r.code) {
            return true;
          }
        }
        return false;
      }

    );
  }

}



