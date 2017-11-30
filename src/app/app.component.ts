import { Observable } from 'rxjs/Observable';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { ChatsPage } from './../pages/chats/chats';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MatchPage } from '../pages/match/match';
import { LoadingPage } from '../pages/loading/loading';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

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

  user: Observable<User>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private afAuth: AngularFireAuth) {
    this.initializeApp();
    this.user = this.afAuth.authState;
    //Check the login status and redirects
    this.afAuth.authState.subscribe(user => {
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
    this.afAuth.auth.signOut().then(() => {
      this.nav.setRoot(LoginPage).then(() => {
        this.menuCtrl.close();
      });
    });
  }

  goMyProfile(){
    this.nav.setRoot(UserProfilePage);
  }
}

