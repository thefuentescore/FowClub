import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {

  constructor(private toast: ToastController) {
    
  }

  createToast(msg: string){
    this.toast.create({
      message: msg,
      duration: 3000
    }).present();
  }
}
