import { ProfilePage } from './../profile/profile';
import { HomePage } from './../home/home';
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

  email: string;
  password: string;

  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, private toast: ToastServiceProvider) {
    this.userService.checkAuthentication().subscribe(user => {
      if (user) {
        this.userService.getDatabaseUser().on('value', snap => {
          if (snap.exists()) {
            this.setHome();
          } else {
            this.navCtrl.setRoot(ProfilePage);
          }
        });
      }
    });
  }

  login() {
    this.userService.login(this.email, this.password).then((data) => {
      this.userService.getDatabaseUser().on('value', snapshot => {
        if (snapshot.exists()) {
          this.setHome();
        } else {

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


