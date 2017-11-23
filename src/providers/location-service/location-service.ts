import { ListCard } from './../../models/listCard';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as GeoFire from"geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MatchServiceProvider {

  dbLocationsRef: any;
  dbOfferListsRef: any;

  geoFire: any;

  _nearbyUsers = new BehaviorSubject([]);
  userId: string;
  matches: Map<string,Array<any>> = new Map<string, Array<any>>();

  geolocationOptions = {
    maximumAge: 60000,
    timeout: 10000,
    enableHighAccuracy: true
  };

  constructor(private database: AngularFireDatabase, private geolocation: Geolocation, private afAuth: AngularFireAuth) {
    console.log('Hello LocationServiceProvider Provider');
    this.dbLocationsRef = this.database.database.ref().child('locations');
    this.dbOfferListsRef = this.database.database.ref().child('offerLists');
    
    this.geoFire = new GeoFire(this.dbLocationsRef);

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      else{
        console.log("logged out");
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

  get nearbyUsers(): Observable < any[] > {
    return this._nearbyUsers.asObservable();
  }

}

