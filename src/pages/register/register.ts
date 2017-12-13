import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../models/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { Loading } from 'ionic-angular/components/loading/loading';
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

  loading : Loading;
  constructor(
    private userService: UserServiceProvider, 
    public navCtrl: NavController,
     public navParams: NavParams, 
     private toast: ToastServiceProvider, 
     private loadingCtrl: LoadingController) {}

  register() {
    this.showLoading();
    this.userService.register(this.email, this.password)
    .then(() => {
      this.navCtrl.popToRoot();
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

