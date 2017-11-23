import { CardServiceProvider } from './../../providers/card-service/card-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewCardImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-card-image',
  templateUrl: 'view-card-image.html',
})
export class ViewCardImagePage {
  code: string;
  imageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardsService: CardServiceProvider) {
    this.code = this.navParams.data.code;
    this.cardsService.downloadCardImage(this.code).then(url =>{
      // Insert url into an <img> tag to "download"
      this.imageUrl = url;
    }).catch(function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object_not_found':
         console.error("Object Not Found!");
          break;

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.error("Unauthorized access!");
          break;

        case 'storage/canceled':
          // User canceled the upload
          console.error("Upload Canceled");
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          console.error("Unknown error!");
          break;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCardImagePage');
  }

}
