import { UserData } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserServiceProvider } from '../user-service/user-service';
import { Assesment } from '../../models/assesment';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';

/*
  Generated class for the AssesmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
class UserAssesment{
  assesment: Assesment;
  user: UserData;
}


@Injectable()
export class AssesmentServiceProvider {
  assesmentList: AngularFireList<any[]>;
  assesmentInfo: AngularFireObject<any>;
  assesmentsRef: any;
  constructor(private database: AngularFireDatabase, private userService: UserServiceProvider) {
    console.log('Hello AssesmentServiceProvider Provider');
    this.assesmentsRef = this.database.database.ref().child('assesments');
    this.assesmentInfo = this.database.object(this.assesmentsRef.child(this.userService.getCurrentUserId()));
    this.assesmentList = this.database.list(this.assesmentsRef.child(this.userService.getCurrentUserId()).child('list'));  
  }

  getAssesmentList(){
    return this.assesmentList.snapshotChanges().map(snapshot =>{
      return snapshot.map(c =>{
        const assesment =  c.payload.val() as Assesment;
        const user = this.userService.getUserData(c.payload.key).valueChanges() as Observable<UserData>;
        return {assesment, user};
      });
    });
  }
  getAssesmentInfo(){
    return this.assesmentInfo.valueChanges();
  }
}

