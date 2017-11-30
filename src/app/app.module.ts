import { ValorationStarsComponent } from './../pages/valoration-stars/valoration-stars';
import { MorePopover } from './../pages/user-profile/more-popover/more-popover';
import { ChatviewPage } from './../pages/chatview/chatview';
import { ChatsPage } from './../pages/chats/chats';
import { Geolocation } from '@ionic-native/geolocation';
import { OfferedTab, SearchedTab } from './../pages/list/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPage } from 'ionic-angular';
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
import { ListServiceProvider } from '../providers/list-service/list-service';
import { ViewCardImagePage } from '../pages/view-card-image/view-card-image';
import { EditListCardPage } from '../pages/edit-list-card/edit-list-card';
import { MatchPage } from '../pages/match/match';
import { MatchServiceProvider } from '../providers/location-service/location-service';
import { LoadingPage } from '../pages/loading/loading';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { AssesmentServiceProvider } from '../providers/assesment-service/assesment-service';


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
    AddCardToListPage,
    OfferedTab,
    SearchedTab,
    ViewCardImagePage,
    EditListCardPage,
    MatchPage,
    LoadingPage,
    ChatsPage,
    ChatviewPage,
    UserProfilePage,
    MorePopover,
    ValorationStarsComponent
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
    AddCardToListPage,
    OfferedTab,
    SearchedTab,
    ViewCardImagePage,
    EditListCardPage,
    MatchPage,
    LoadingPage,
    ChatsPage,
    ChatviewPage,
    UserProfilePage,
    MorePopover,
    ValorationStarsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastServiceProvider,
    CardServiceProvider,
    Camera,
    ListServiceProvider,
    MatchServiceProvider,
    Geolocation,
    ChatServiceProvider,
    AssesmentServiceProvider
  ]
})
export class AppModule {}
