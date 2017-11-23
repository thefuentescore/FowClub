import { ToastServiceProvider } from './../../providers/toast-service/toast-service';
import { Component } from '@angular/core';
import { UserData } from './../../models/user';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {} as UserData;

  constructor(private camera: Camera, private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams, public toast: ToastServiceProvider) {}

  createProfile() {
    if (this.user.userName) {
      this.userService.createUserProfile(this.user).then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    } else {
      this.toast.createToast("Username cannot be empty!");
    }

  }

  takePhoto() {
    //camera options
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(imageData => {
      this.user.photo = `data:image/jpeg;base64,${imageData}`;
    });
  }
}


