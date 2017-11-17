import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { AddCardToListPage } from './../pages/add-card-to-list/add-card-to-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { CardServiceProvider } from '../providers/card-service/card-service';
import { PipesModule } from '../pipes/pipes.module';


export const firebaseConfig ={
    apiKey: "AIzaSyCRxTC81mR-14RATQvbbhn3e0rU4lbH7XQ",
    authDomain: "fowclub-a27f3.firebaseapp.com",
    databaseURL: "https://fowclub-a27f3.firebaseio.com",
    projectId: "fowclub-a27f3",
    storageBucket: "fowclub-a27f3.appspot.com",
    messagingSenderId: "2811380368"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    ListPage,
    ProfilePage,
    AddCardToListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, 'FowClub'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    ListPage,
    ProfilePage,
    AddCardToListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastServiceProvider,
    CardServiceProvider,
    Camera

  ]
})
export class AppModule {}
