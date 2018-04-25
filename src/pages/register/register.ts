import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoginPage } from '../login/login';
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

  loading: Loading;
  constructor(
    private userService: UserServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController) {}

  register() {
    this.showLoading();
    this.userService.register(this.email, this.password)
      .then(() => {
        this.navCtrl.pop();
      });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}

