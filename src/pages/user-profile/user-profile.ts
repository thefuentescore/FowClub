import { MorePopover } from './more-popover/more-popover';
import { Assesment } from './../../models/assesment';
import { UserData } from './../../models/user';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AssesmentServiceProvider } from '../../providers/assesment-service/assesment-service';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: Observable < any > ;
  userPhoto: string;
  assesmentInfo: Observable < any > ;
  assesmentList: Observable < any[] > ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private db: AngularFireDatabase,
    private assesmentService: AssesmentServiceProvider,
    private popover: PopoverController) {

    this.user = this.db.object(this.userService.getDatabaseUser()).snapshotChanges().map(snapshot => {
      const userName = snapshot.payload.val().userName;
      const photo = snapshot.payload.val().photo;
      this.userPhoto = photo;
      return {
        userName,
        photo
      };
    });
    this.assesmentInfo = this.assesmentService.getAssesmentInfo();
    this.assesmentList = this.assesmentService.getAssesmentList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  openMore(event) {
    let popover = this.popover.create(MorePopover);
    popover.present({
      ev: event
    });
  }
}

