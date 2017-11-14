import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, private toast: ToastServiceProvider) {
    this.user = userService.getCurrentUser();
    if(this.user){
      this.setHome();
    }
  }

  async login(user: User) {
    try {
      if (await this.userService.login(user.email, user.password)) {
        this.setHome();
      } else {
        this.toast.createToast("Login failed! Please check your email and password.");
      }
    } catch (err) {
      console.error(err);
    }
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }

  private setHome(){
    this.navCtrl.setRoot(HomePage);
  }
}

