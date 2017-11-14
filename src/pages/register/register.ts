import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams,private toast: ToastServiceProvider) {
  }

  async register(user: User) {
    try {
      if (await this.userService.register(user.email, user.password)) {
        this.navCtrl.push(LoginPage);
      } else {
        this.toast.createToast("Register failed! Please try again.")
      }
    } catch (err) {
      console.error(err);
    }
  }

}
