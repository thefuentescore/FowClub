import { UserData } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserServiceProvider } from '../user-service/user-service';
import { Assesment } from '../../models/assesment';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';

/*
  Generated class for the AssesmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssesmentServiceProvider {
  assesmentList: AngularFireList < any[] > ;
  assesmentsRef: any;

  constructor(private database: AngularFireDatabase, private userService: UserServiceProvider) {
    console.log('Hello AssesmentServiceProvider Provider');
    this.assesmentsRef = this.database.database.ref().child('assesments');
    this.assesmentList = this.database.list(this.assesmentsRef.child(this.userService.getCurrentUserId()));
  }

  getAssesmentList() {
    return this.assesmentList.snapshotChanges().map(snapshot => {
      return snapshot.map(c => {
        const assesment = c.payload.val() as Assesment;
        const user = this.userService.getUserData(c.payload.key).valueChanges() as Observable < UserData > ;
        return {
          assesment,
          user
        };
      });
    });
  }
  saveAssesment(assesment: Assesment, toUser: string) {
    return this.assesmentsRef.child(toUser).child(this.userService.getCurrentUserId()).set(assesment);
  }
  updateAverageScore(user: string) {
    let scores: Array < number > = [];
    let average: number = 0;

    return new Promise((resolve, reject) => {
      this.database.database.ref().child('assesments').child(user).on('value', snap => {
        snap.forEach(element => {
          scores.push(element.val().score);
          return false;
        });
        scores.forEach(score => {
          average = average + (+score);
        })
        average = average / scores.length;
        resolve(this.database.database.ref().child('users').child(user).child('score').set(average).then(() => {
          average = 0;
          scores = [];
        }));
      });
    });
  }
}


