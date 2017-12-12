import { AssesmentServiceProvider } from './../../../providers/assesment-service/assesment-service';
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
  userId: string;

  constructor(public params: NavParams, public viewCtrl: ViewController, private assesmentService: AssesmentServiceProvider) {
    this.userId = this.params.data.user;
  }
  saveAssesment() {
    let assesment = {
      score: this.score,
      comment: this.comment,
      date: +new Date()
    }
    this.assesmentService.saveAssesment(assesment, this.userId)
      .then(() => {
        this.assesmentService.updateAverageScore(this.userId)
          .then(() => {
            this.viewCtrl.dismiss();
          })
          .catch(err => {
            console.error(err);
          })
      })
      .catch(err => {
        console.error(err);
      });
  }
}


