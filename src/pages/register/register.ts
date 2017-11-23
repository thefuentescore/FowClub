import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../models/user';
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

  email: string;
  password: string;

  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, private toast: ToastServiceProvider) {}

  register() {
    this.userService.register(this.email, this.password)
    .then(() => {
      this.navCtrl.push(LoginPage);
    });
  }

}

