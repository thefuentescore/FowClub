import { LoginPage } from './../../login/login';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavParams } from 'ionic-angular';
import { Component } from "@angular/core";
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { ProfilePage } from '../../profile/profile';

@Component({
  selector: 'more-popover',
  templateUrl: 'more-popover.html',
})
export class MorePopover {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private userService: UserServiceProvider) {

  }

  editProfile() {
    this.navCtrl.push(ProfilePage);
  }
  logout() {
    this.userService.logOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }
}
