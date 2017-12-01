import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the AddCardToListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'rate-user',
  templateUrl: 'rate-user.html',
})
export class RateUserPopover {
  comment: string;
  score: number;
  userName: string;
  
  constructor(public params: NavParams, public viewCtrl: ViewController) {
    let user  =  params.data.user;
    user.map(data =>{
      this.userName =  data.userName;
    })
  }
  saveAssesment() {
    this.viewCtrl.dismiss();
  }

}

