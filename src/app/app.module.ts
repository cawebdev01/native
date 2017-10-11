import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { HomeServiceProvider } from '../providers/home-service/home-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
	  Calendar,
  	BackgroundMode,
  	LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeServiceProvider,
    LoginServiceProvider,
  ]
})
export class AppModule {}
