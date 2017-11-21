import { ProfilePage } from './../profile/profile';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, private toast: ToastServiceProvider) {

  }

  login() {
    this.userService.login(this.email, this.password).then((data) => {
      this.userService.getDatabaseUser().on('value', snapshot => {
        if (snapshot.exists()) {
          this.setHome();
        } else {
          this.navCtrl.setRoot(ProfilePage);
        }
      });
    }).catch(err => {
      this.toast.createToast("Cannot login, please check your email and password.")
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  setHome() {
    this.navCtrl.setRoot(HomePage);
  }
}


