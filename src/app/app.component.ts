import { ChatsPage } from './../pages/chats/chats';
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
import { MatchPage } from '../pages/match/match';
import { LoadingPage } from '../pages/loading/loading';
import { MenuController } from 'ionic-angular/components/app/menu-controller';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoadingPage;
  pages: Array < {
    title: string,
    component: any
  } > ;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private userService: UserServiceProvider) {
    this.initializeApp();
    //Check the login status and redirects
    this.userService.checkAuthentication().subscribe(user => {
      if (user) {
        this.nav.setRoot(HomePage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    });
    // used for an example of ngFor and navigation
    this.pages = [{
        title: 'Matches',
        component: MatchPage
      },
      {
        title: 'Search',
        component: HomePage
      },
      {
        title: 'My Lists',
        component: ListPage
      },
      {
        title: 'Messages',
        component: ChatsPage
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.userService.logOut().then(() => {
      this.nav.setRoot(LoginPage).then(()=>{
        this.menuCtrl.close();
      });
    });
  }
}
