import { UserData } from './../../models/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {} as UserData;

  constructor(private camera: Camera, private userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {}

  createProfile() {
    this.userService.createUserProfile(this.user).then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  takePhoto() {
    //camera options
    const options: CameraOptions = {
      destinationType   : this.camera.DestinationType.DATA_URL,
      sourceType        : this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(imageData => {
      this.user.photo = `data:image/jpeg;base64,${imageData}`;
    });
  }
}

