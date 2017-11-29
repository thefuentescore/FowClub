import { ProfilePage } from './../profile/profile';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public storate: Storage, private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private toast: ToastServiceProvider) {
    this.menu.swipeEnable(false);
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
      console.log(err);
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



