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

  email : string;
  password: string;

  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, private toast: ToastServiceProvider) {
    if(userService.isUserLogged()){
      this.setHome();
    }
  }

  login() {
    try {
      this.userService.login(this.email, this.password).then(() => {
        this.setHome();
      }).catch(err =>{
        this.toast.createToast("Cannot login, please check your email and password.")
      });
    } catch (err) {
      console.error(err);
    }
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }

  setHome() {
    this.navCtrl.setRoot(HomePage);
  }

}

