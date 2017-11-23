import { ListCard } from './../../models/listCard';
import { MatchServiceProvider } from './../../providers/location-service/location-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ListServiceProvider } from '../../providers/list-service/list-service';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as GeoFire from"geofire";
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  dbLocationsRef: any;
  dbOfferListsRef: any;

  geoFire: any;

  userId: string;
  matches: any[] = [];

  geolocationOptions = {
    maximumAge: 60000,
    timeout: 10000,
    enableHighAccuracy: true
  };
  currentLocation: any;

  userSearchListRef : AngularFireList<any>;
  userSearchList: ListCard[];

  allOfferListsRef: AngularFireList<any>;

  constructor(private matchService: MatchServiceProvider,
              private listService: ListServiceProvider,
              private location: Geolocation, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              private database: AngularFireDatabase, 
              private geolocation: Geolocation, 
              private afAuth: AngularFireAuth) 
  {
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

    this.getUserLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchPage');
  }
  ionViewDidLeave(){
  
  }

  setLocation(key: string, coords: Array < number > ) {
    this.geoFire.set(key, coords)
      .then(() => console.log('location updated'))
      .catch(err => console.log(err));
  }

  getUserLocation() {
    return this.location.getCurrentPosition().then(pos=>{
      this.getLocations(500, [pos.coords.latitude, pos.coords.longitude]);
    });
  }

  fillUserList(){
    this.userSearchListRef.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.key,
        ...c.payload.val()
      }));
    }).forEach(cards => {
      this.userSearchList = cards;
    });
  }

  getLocations(radius: number, coords: Array < number > ) {
    this.geoFire.query({
        center: coords,
        radius: radius
      })
      .on('key_entered', (key, location, distance) => {
        if (key != this.userId) {
          this.dbOfferListsRef.child(key).once("value", snap=>{
            let match = {
              user: key,
              distance: distance,
              cards: snap.val()
            };     
            this.matches.push(match);
          });

        }
      })
  }

}

