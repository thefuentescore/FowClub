import { CardServiceProvider } from './../providers/card-service/card-service';
import { ProfilePage } from './../pages/profile/profile';
import { UserServiceProvider } from './../providers/user-service/user-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ListServiceProvider } from '../providers/list-service/list-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array < {
    title: string,
    component: any
  } > ;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private userService: UserServiceProvider, 
    private cardService: CardServiceProvider, 
    private listService: ListServiceProvider) 
  {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [{
        title: 'Home',
        component: HomePage
      },
      {
        title: 'List',
        component: ListPage
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.userService.checkAuthentication().subscribe(user => {
        if (user) {
          this.userService.getDatabaseUser().on('value', snap => {
            if (snap.exists()) {
              this.nav.setRoot(HomePage);
            } else {
              this.nav.setRoot(ProfilePage);
            }
          });
        }
      });
      
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {    
    this.userService.logOut().then(()=>{
      this.nav.setRoot(LoginPage);
    });
  }
}

