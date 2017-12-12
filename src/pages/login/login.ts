import { ProfilePage } from './../profile/profile';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  loading: Loading;

  constructor(
    private userService: UserServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    private toast: ToastServiceProvider,
    private loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  login() {
    if (this.email && this.password) {
      this.showLoading();
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
        this.showError("Cannot login, please check your email and password.");
      });
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  setHome() {
    this.navCtrl.setRoot(HomePage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    this.toast.createToast(text)
  }
}


